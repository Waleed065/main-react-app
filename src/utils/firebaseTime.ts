interface schema {
  seconds: number;
  nanoseconds: number;
}
interface returnSchema {
  date: string;
  atTime: string;
}
export function firebaseTime(time: schema): returnSchema {
  const fireStoreTime = new Date(
    time.seconds * 1000 + time.nanoseconds / 1000000
  );
  return {
    date: fireStoreTime.toDateString(),
    atTime: fireStoreTime.toLocaleTimeString(),
  };
}
// type returnTypeFirebaseDateObject = {
//   year: number;
//   month: number;
//   day: number;
// };
export function firebaseDateObject(time: schema): Date {
  return new Date(time.seconds * 1000 + time.nanoseconds / 1000000);
  // return {
  //   year: fireStoreTime.getFullYear(),
  //   month: fireStoreTime.getMonth() + 1,
  //   day: fireStoreTime.getDate(),
  // };
}
