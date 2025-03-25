import { Button, Group, Stack, Text, Tooltip, ActionIcon } from '@mantine/core';

const ANSI_COLORS = {
  0: { tooltip: "No Color", color: null },
  1: { tooltip: "Bold", color: null },
  4: { tooltip: "Underline", color: null },
  30: { tooltip: "Dark Gray (33%)", color: '#4f545c' },
  31: { tooltip: "Red", color: '#dc322f' },
  32: { tooltip: "Yellowish Green", color: '#859900' },
  33: { tooltip: "Gold", color: '#b58900' },
  34: { tooltip: "Light Blue", color: '#268bd2' },
  35: { tooltip: "Pink", color: '#d33682' },
  36: { tooltip: "Teal", color: '#2aa198' },
  37: { tooltip: "White", color: '#ffffff' },
  40: { tooltip: "Blueish Black", color: '#002b36' },
  41: { tooltip: "Rust Brown", color: '#cb4b16' },
  42: { tooltip: "Gray (40%)", color: '#586e75' },
  43: { tooltip: "Gray (45%)", color: '#657b83' },
  44: { tooltip: "Light Gray (55%)", color: '#839496' },
  45: { tooltip: "Blurple", color: '#6c71c4' },
  46: { tooltip: "Light Gray (60%)", color: '#93a1a1' },
  47: { tooltip: "Cream White", color: '#fdf6e3' }
};

export default function StyleButtons() {

    const handleStyle = (ansi) => {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0 || selection.toString().trim() === '') {
            alert('Please select some text first!');
            return;
        }

        const range = selection.getRangeAt(0);
        const selectedText = range.toString();

        // For reset/removing formatting
        if (ansi === '0') {
            const textNode = document.createTextNode(selectedText);
            range.deleteContents();
            range.insertNode(textNode);
            return;
        }

        const span = document.createElement("span");
        span.textContent = selectedText;
        
        // Add background or foreground class based on the code
        if (parseInt(ansi) >= 40) {
            span.className = `ansi-${ansi}`;
        } else {
            span.className = `ansi-${ansi}`;
        }

        range.deleteContents();
        range.insertNode(span);

        // Clear selection
        selection.removeAllRanges();
    };


  return (
    <Stack gap="md" mb="xl">
      <Group>
        <Button variant="default" onClick={() => handleStyle('0')}>Reset All</Button>
        <Button variant="default" onClick={() => handleStyle('1')} fw={700}>Bold</Button>
        <Button variant="default" onClick={() => handleStyle('4')} td="underline">Line</Button>
      </Group>

      <Stack gap="xs">
        <Text fw={500} c="white">FG (Text Color)</Text>
        <Group>
          <Tooltip label={ANSI_COLORS[0].tooltip}>
            <ActionIcon
              variant="default"
              onClick={() => handleStyle('0')}
              size="lg"
              className="border-dashed"
            />
          </Tooltip>
          {[30, 31, 32, 33, 34, 35, 36, 37].map((code) => (
            <Tooltip key={code} label={ANSI_COLORS[code].tooltip}>
              <ActionIcon
                onClick={() => handleStyle(code.toString())}
                size="lg"
                style={{ backgroundColor: ANSI_COLORS[code].color }}
              />
            </Tooltip>
          ))}
        </Group>
      </Stack>

      <Stack gap="xs">
        <Text fw={500} c="white">BG (Background Color)</Text>
        <Group>
          <Tooltip label={ANSI_COLORS[0].tooltip}>
            <ActionIcon
              variant="outline"
              onClick={() => handleStyle('0')}
              size="lg"
              className="border-dashed"
            />
          </Tooltip>
          {[40, 41, 42, 43, 44, 45, 46, 47].map((code) => (
            <Tooltip key={code} label={ANSI_COLORS[code].tooltip}>
              <ActionIcon
                onClick={() => handleStyle(code.toString())}
                size="lg"
                style={{ backgroundColor: ANSI_COLORS[code].color }}
              />
            </Tooltip>
          ))}
        </Group>
      </Stack>
    </Stack>
  );
}
