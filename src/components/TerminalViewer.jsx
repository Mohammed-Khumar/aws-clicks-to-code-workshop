import React, { useState } from 'react';
import { Terminal, Copy, Check, RotateCcw } from 'lucide-react';
import { workshopConfig } from '../data/workshopConfig';

export default function TerminalViewer() {
  const [copied, setCopied] = useState(false);
  const [replayKey, setReplayKey] = useState(0);
  const { terminalSequence, cloudFormationSnippet } = workshopConfig;

  const handleCopy = () => {
    navigator.clipboard.writeText(cloudFormationSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReplay = () => {
    setReplayKey(prev => prev + 1);
  };

  // Clean, lightweight YAML syntax highlighter for CloudFormation
  const renderHighlightedYaml = (code) => {
    return code.split('\n').map((line, lineIdx) => {
      // Line comment
      if (line.trim().startsWith('#')) {
        return (
          <div key={lineIdx} className="yaml-line">
            <span className="yaml-comment">{line}</span>
          </div>
        );
      }

      // Inline comment detection
      let codePart = line;
      let commentPart = '';
      const commentIndex = line.indexOf(' #');
      if (commentIndex !== -1) {
        codePart = line.substring(0, commentIndex);
        commentPart = line.substring(commentIndex);
      }

      // Key-Value match
      const keyValMatch = codePart.match(/^(\s*)([A-Za-z0-9_-]+):(.*)$/);
      if (keyValMatch) {
        const indent = keyValMatch[1];
        const key = keyValMatch[2];
        const rest = keyValMatch[3];

        let styledRest = rest;
        // Check for intrinsic functions like !Ref, !Sub, !GetAtt
        if (rest.includes('!Ref') || rest.includes('!Sub') || rest.includes('!GetAtt')) {
          const parts = rest.split(/(!Ref|!Sub|!GetAtt)/g);
          styledRest = parts.map((p, i) => {
            if (p === '!Ref' || p === '!Sub' || p === '!GetAtt') {
              return <span key={i} className="yaml-fn">{p}</span>;
            }
            return <span key={i} className="yaml-val">{p}</span>;
          });
        } else if (rest.includes('AWS::')) {
          styledRest = <span className="yaml-type">{rest}</span>;
        } else if (rest.trim()) {
          styledRest = <span className="yaml-val">{rest}</span>;
        }

        return (
          <div key={lineIdx} className="yaml-line">
            <span>{indent}</span>
            <span className="yaml-key">{key}:</span>
            {styledRest}
            {commentPart && <span className="yaml-comment">{commentPart}</span>}
          </div>
        );
      }

      // Regular indented line (e.g. UserData script lines, array items)
      if (codePart.includes('AWS::')) {
        return (
          <div key={lineIdx} className="yaml-line">
            <span className="yaml-type">{codePart}</span>
            {commentPart && <span className="yaml-comment">{commentPart}</span>}
          </div>
        );
      }

      return (
        <div key={lineIdx} className="yaml-line">
          <span className="yaml-text">{codePart}</span>
          {commentPart && <span className="yaml-comment">{commentPart}</span>}
        </div>
      );
    });
  };

  return (
    <section id="terminal" className="section-wrapper hook-section">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Live Engineering View</span>
          <h2 className="section-title">Terminal &amp; CloudFormation Experience</h2>
          <p className="section-description">
            See how live EC2 operations connect securely via Session Manager and codify cleanly into declarative templates.
          </p>
        </div>

        <div className="terminal-code-grid">
          {/* Left: Terminal Window */}
          <div className="terminal-window">
            <div className="terminal-header">
              <div className="window-dots" aria-hidden="true">
                <span className="window-dot dot-red"></span>
                <span className="window-dot dot-yellow"></span>
                <span className="window-dot dot-green"></span>
              </div>
              <span className="terminal-title">bash — ec2-user@ssm-session</span>
              <button
                type="button"
                className="terminal-replay-btn"
                onClick={handleReplay}
                title="Replay sequence"
              >
                <RotateCcw size={12} />
                <span>Replay</span>
              </button>
            </div>

            <div className="terminal-body" key={replayKey}>
              {terminalSequence.map((item, idx) => {
                if (item.command) {
                  return (
                    <div key={idx} className="term-line-cmd">
                      {item.command}
                    </div>
                  );
                }
                if (item.output) {
                  return (
                    <div key={idx} className="term-line-out">
                      {item.output}
                    </div>
                  );
                }
                if (item.success) {
                  return (
                    <div key={idx} className="term-line-success">
                      {item.success}
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>

          {/* Right: CloudFormation Code Snippet Viewer */}
          <div className="code-viewer-window">
            <div className="code-header">
              <div className="window-dots" aria-hidden="true">
                <span className="window-dot dot-red"></span>
                <span className="window-dot dot-yellow"></span>
                <span className="window-dot dot-green"></span>
              </div>
              <span className="code-filename">template.yaml (CloudFormation)</span>
              <button
                type="button"
                className="code-copy-btn"
                onClick={handleCopy}
                aria-label="Copy CloudFormation Template"
              >
                {copied ? <Check size={14} className="text-green-highlight" /> : <Copy size={14} />}
                <span>{copied ? 'Copied' : 'Copy Template'}</span>
              </button>
            </div>

            <div className="code-pre-block" tabIndex={0} role="region" aria-label="CloudFormation YAML code preview">
              {renderHighlightedYaml(cloudFormationSnippet)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
