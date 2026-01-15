interface SectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  background?: "white" | "gray";
}

export default function Section({
  id,
  children,
  className = "",
  background = "white",
}: SectionProps) {
  const bgClass = background === "gray" ? "bg-gray-50" : "bg-white";

  return (
    <section id={id} className={`section-padding ${bgClass} ${className}`}>
      <div className="container-custom">{children}</div>
    </section>
  );
}
