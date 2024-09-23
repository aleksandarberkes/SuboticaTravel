export const getLaneColor = (lane: string) => {
  switch (lane) {
    case '1A':
      return 'gray';
    case '2':
      return 'darkred';
    case '3':
      return 'blue';
    case '4':
      return 'yellow';
    case '6':
      return 'green';
    case '7':
      return 'black';
    case '8':
      return 'burlywood';
    case '8A':
      return 'pink';
    case '9':
      return 'darkcyan';
    case '10':
      return 'darkslateblue';
    case '16':
      return 'darkgoldenrod';
    default:
      return 'black';
  }
};
