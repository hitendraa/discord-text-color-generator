import { useEffect, useRef, useState } from 'react';
import { Paper, Button, Stack } from '@mantine/core';
import { nodesToANSI } from './textFormatter';

export default function TextEditor() {
  const editorRef = useRef(null);
const [copyStatus, setCopyStatus] = useState({ message: 'Copy text as Discord formatted', count: 0 });
let copyTimeout;

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;

    const handleInput = () => {
      const base = editor.innerHTML.replace(/<(\/?(br|span|span class="ansi-[0-9]*"))>/g, "[$1]");
      if (base.includes("<") || base.includes(">")) {
        editor.innerHTML = base.replace(/<.*?>/g, "").replace(/[<>]/g, "").replace(/\[(\/?(br|span|span class="ansi-[0-9]*"))\]/g, "<$1>");
      }
    };

    editor.addEventListener('input', handleInput);
    return () => editor.removeEventListener('input', handleInput);
  }, []);

  const handleCopy = async () => {
    if (!editorRef.current) return;

    const toCopy = "```ansi\n" + nodesToANSI(editorRef.current.childNodes, [{ fg: 2, bg: 2, st: 2 }]) + "\n```";
    
    try {
      await navigator.clipboard.writeText(toCopy); 
      updateCopyStatus();
    } catch (err) {
      if (copyStatus.count <= 2) {
        alert(`Copying failed. Try copying manually: ${err}`);
        alert(toCopy);
      }
    }
  };

  const updateCopyStatus = () => {
    const messages = ["Copied!", "Double Copy!", "Triple Copy!", "Dominating!!", "Rampage!!", "Mega Copy!!", "Unstoppable!!", "Wicked Sick!!", "Monster Copy!!!", "GODLIKE!!!", "BEYOND GODLIKE!!!!", "█".repeat(16)];
    
    const newCount = Math.min(11, copyStatus.count + 1);
    setCopyStatus({ message: messages[newCount], count: newCount });

    if (copyTimeout) clearTimeout(copyTimeout);
    copyTimeout = setTimeout(() => {
      setCopyStatus({ message: 'Copy text as Discord formatted', count: 0 });
    }, 2000);
  };

  return (
    <Stack gap="md" align="center">
      <Paper
        ref={editorRef}
        contentEditable
        shadow="sm"
        p="md"
        style={{
          width: '100%',
          minHeight: '150px',
          backgroundColor: '#2f3136',
          color: '#dcddde',
          borderRadius: '4px',
          padding: '1rem',
          lineHeight: '1.5',
          cursor: 'text'
        }}
        suppressContentEditableWarning
      >
        Welcome to <span className="ansi-45"><span className="ansi-37">Discord</span></span> <span className="ansi-31">C</span><span className="ansi-32">o</span><span className="ansi-33">l</span><span className="ansi-34">o</span><span className="ansi-35">r</span><span className="ansi-36">e</span><span className="ansi-37">d</span> Text Generator!
      </Paper>
      <Button
        onClick={handleCopy}
        color={copyStatus.count <= 8 ? 'teal' : 'red'}
        variant="filled"
        size="md"
      >
        {copyStatus.message}
      </Button>
    </Stack>
  );
}
