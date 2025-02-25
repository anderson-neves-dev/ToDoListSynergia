export function formatHoraMinuto(date: Date): string {
  const horas = date.getHours().toString().padStart(2, "0");
  const minutos = date.getMinutes().toString().padStart(2, "0");
  return `${horas}:${minutos}`;
}

export const formatarData = (data: Date) => {
  return new Date(data).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
