
export const fetchUser = async () => {
  const response = await fetch('https://randomuser.me/api/?results=1&nat=us');
  if (!response.ok) {
    throw new Error('خطا در برقراری ارتباط با سرور');
  }
  const data = await response.json();
  return data.results[0];
};