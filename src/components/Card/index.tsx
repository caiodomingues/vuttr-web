import { FormEvent, ReactNode } from "react";

import { Tool } from "../../types";
import { Container } from "./styles";

import { ReactComponent as Close } from "../../assets/img/icon-close.svg";

interface CardProps {
  tool: Tool;
  handleDeleteTool: (evt: FormEvent, id: number) => void;
  children?: ReactNode;
}

function Card({ tool, handleDeleteTool, children }: CardProps) {
  const { id, title, description, link, tags } = tool;

  return (
    <Container>
      <div>
        <a target="_blank" rel="noreferrer" href={link}>
          {title}
        </a>
        <button onClick={(evt) => handleDeleteTool(evt, id)}>
          <Close className="red" /> remove
        </button>
      </div>
      <p>{description}</p>
      {tags.map((tag, index) => (
        <span key={index}>#{tag}</span>
      ))}
    </Container>
  );
}

export default Card;
