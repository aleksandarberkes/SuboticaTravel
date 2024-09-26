export const getLaneColor = (lane: string) => {
  switch (lane) {
    case '1A':
      return '#db117b';
    case '2':
      return '#b7afd4';
    case '3':
      return '#984379';
    case '4':
      return '#c5c302';
    case '6':
      return '#dc241b';
    case '7':
      return '#722100';
    case '8':
      return '#0094e7';
    case '8A':
      return '#ff721f';
    case '9':
      return '#ef98a0';
    case '10':
      return '#068c39';
    case '16':
      return '#26136b';
    default:
      return 'black';
  }
};
