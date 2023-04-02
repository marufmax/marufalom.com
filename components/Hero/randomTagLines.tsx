import { useState, useEffect } from "react";

const tagLines: string[] = [
  'Building things.',
  'Focusing on performance, security, and scalability.',
  'Code, Test, Debug, Repeat!',
  'Crafting things that changes lives!',
  'Turning problem into solution',
];

export default function TagLines(): JSX.Element {
  const [tagLine, setTagLine] = useState<string>("");

  useEffect(() => {
    const randomIndex: number = Math.floor(Math.random() * tagLines.length);
    setTagLine(tagLines[randomIndex]);
  }, []);

  return <h1>{tagLine}</h1>;
}
