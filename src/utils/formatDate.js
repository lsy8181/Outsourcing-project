export function formatDate(isoString) {
  const date = new Date(isoString); // ISO 문자열을 Date 객체로 변환
  const pad = (num) => String(num).padStart(2, '0'); // 숫자를 두 자리로 패딩

  const month = pad(date.getMonth() + 1); // 월은 0부터 시작하므로 1을 더해야 함
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${month}.${day} ${hours}:${minutes}:${seconds}`;
}
