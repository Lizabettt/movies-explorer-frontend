export default function timeMovie(time) {

  const hours = Math.floor(time / 60);
  const minutes = time % 60;
  return `${hours}ч. ${minutes}м.`;
}
