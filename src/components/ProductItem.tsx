import React from "react";

export default function ProductItem({ hit, components }: any) {
  console.log({ hit, components });

  return (
    <a href={hit.url}>
      <components.Highlight hit={hit} attribute="name" />
    </a>
  );
}
