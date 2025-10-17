type PlaceholderCardProps = {
  title: string;
  description?: string;
};

export function PlaceholderCard({ title, description }: PlaceholderCardProps) {
  return (
    <section
      style={{
        border: "1px solid currentColor",
        padding: "1rem",
        borderRadius: "0.5rem",
      }}
    >
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </section>
  );
}
