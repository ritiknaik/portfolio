// Renders "plain *highlighted* plain" with the starred words wrapped in <em>.
export default function Emph({ text }) {
  return text.split('*').map((part, i) => (i % 2 ? <em key={i}>{part}</em> : part));
}
