export const getRouteIdDisplay = (routeId: string): string => {
  let split = routeId.split('_');
  const filteredId = split.slice(0, -1).join('_');
  switch (filteredId) {
    case 'Linija_1A_Smer_A_radni_dan':
      return '';
    case 'Linija_1A_Smer_A_radni_dan_M':
      return 'od Mesca';
    case 'Linija_1A_Smer_A_radni_dan_J':
      return 'do Jadrana';
    case 'Linija_1A_Smer_B_radni_dan':
      return '';
    case 'Linija_1A_Smer_B_radni_dan_M':
      return 'do Mesca';
    case 'Linija_1A_Smer_B_radni_dan_J':
      return 'od Jadrana';

    case 'Linija_1A_Smer_A_nedelja_i_praznici':
      return '';
    case 'Linija_1A_Smer_A_nedelja_i_praznici_M':
      return 'od Mesca';
    case 'Linija_1A_Smer_A_nedelja_i_praznici_J':
      return 'do Jadrana';
    case 'Linija_1A_Smer_B_nedelja_i_praznici':
      return '';
    case 'Linija_1A_Smer_B_nedelja_i_praznici_M':
      return 'do Mesca';
    case 'Linija_1A_Smer_B_nedelja_i_praznici_J':
      return 'od Jadrana';

    case 'Linija_2_Smer_A_radni_dan':
      return '';
    case 'Linija_2_Smer_A_radni_dan_M':
      return 'od Mesca';
    case 'Linija_2_Smer_A_radni_dan_J':
      return 'do Jadrana';
    case 'Linija_2_Smer_B_radni_dan':
      return '';
    case 'Linija_2_Smer_B_radni_dan_M':
      return 'do Mesca';
    case 'Linija_2_Smer_B_radni_dan_J':
      return 'od Jadrana';

    case 'Linija_2_Smer_A_nedelja_i_praznici':
      return '';
    case 'Linija_2_Smer_A_nedelja_i_praznici_M':
      return 'od Mesca';
    case 'Linija_2_Smer_A_nedelja_i_praznici_J':
      return 'do Jadrana';
    case 'Linija_2_Smer_B_nedelja_i_praznici':
      return '';
    case 'Linija_2_Smer_B_nedelja_i_praznici_M':
      return 'do Mesca';
    case 'Linija_2_Smer_B_nedelja_i_praznici_J':
      return 'od Jadrana';

    case 'Linija_3_Smer_A_Raspust_radni_dan':
      return '';
    case 'Linija_3_Smer_A_Od_Patrija_Školski_radni_dan':
      return 'od Patrije';
    case 'Linija_3_Smer_A_Školski_radni_dan':
      return 'Djacki';
    case 'Linija_3_Smer_A_Do_Lifka_Raspust_radni_dan':
      return 'do Lifke';
    case 'Linija_3_Smer_A_Do_Lifka_Školski_radni_dan':
      return 'do Lifke, Djacki';
    case 'Linija_3_Smer_A_Do_Radio_Subotica_Školski_radni_dan':
      return 'do Radio Subotice';

    case 'Linija_3_Smer_B_Raspust_radni_dan':
      return '';
    case 'Linija_3_Smer_B_Do_Patrija_Školski_radni_dan':
      return 'od Patrije';
    case 'Linija_3_Smer_B_Školski_radni_dan':
      return 'Djacki';
    case 'Linija_3_Smer_B_Od_Lifka_Raspust_radni_dan':
      return 'od Lifke';
    case 'Linija_3_Smer_B_Od_Lifka_Školski_radni_dan':
      return 'od Lifke, Djacki';
    case 'Linija_3_Smer_B_Od_Radio_Subotica_Raspust_radni_dan':
      return 'od Radio Subotice';
    case 'Linija_3_Smer_B_Do_Nova_Opština_Raspust_radni_dan':
      return 'do Nove Opstine';

    case 'Linija_3_Smer_A_Raspust_nedelja_i_praznici':
      return '';
    case 'Linija_3_Smer_A_Do_Radio_Subotica_Raspust_nedelja_i_praznici':
      return 'do Radio Subotice';
    case 'Linija_3_Smer_B_Raspust_nedelja_i_praznici':
      return '';
    case 'Linija_3_Smer_B_Od_Radio_Subotica_Raspust_nedelja_i_praznici':
      return 'od Radio Subotice';

    case 'Linija_4_Smer_A_radni_dan':
      return '';
    case 'Linija_4_Smer_A_Do_Subotica_-_Trans_radni_dan':
      return 'do Garaze';
    case 'Linija_4_Smer_B_radni_dan':
      return '';
    case 'Linija_4_Smer_B_radni_dan_djacki':
      return 'Djacki';

    case 'Linija_6_Smer_A_radni_dan':
      return '';
    case 'Linija_6_Smer_A_Od_Subotica_-_Trans_radni_dan':
      return 'od Garaze';
    case 'Linija_6_Smer_A_Od_Calzedonia_radni_dan':
      return 'od Calzedonie (Gordona)';
    case 'Linija_6_Smer_A_Do_Subotica_-_Trans_radni_dan':
      return 'do Garaze';

    case 'Linija_6_Smer_B_radni_dan':
      return '';
    case 'Linija_6_Smer_B_Od_Subotica_-_Trans_radni_dan':
      return 'od Garaze';
    case 'Linija_6_Smer_B_Do_Calzedonia_radni_dan':
      return 'do Calzedonie (Gordona)';
    case 'Linija_6_Smer_B_Do_Subotica_-_Trans_radni_dan':
      return 'do Garaze';

    case 'Linija_6_Smer_A_nedelja_i_praznici':
      return '';
    case 'Linija_6_Smer_A_Od_Subotica_-_Trans_nedelja_i_praznici':
      return 'od Garaze';
    case 'Linija_6_Smer_A_Do_Subotica_-_Trans_nedelja_i_praznici':
      return 'do Garaze';

    case 'Linija_6_Smer_B_nedelja_i_praznici':
      return '';
    case 'Linija_6_Smer_B_Od_Subotica_-_Trans_nedelja_i_praznici':
      return 'od Garaze';
    case 'Linija_6_Smer_B_Do_Subotica_-_Trans_nedelja_i_praznici':
      return 'do Garaze';

    case 'Linija_7_Smer_B_subota':
      return '';
    case 'Linija_7_Smer_A_nedelja_i_praznici':
      return '';
    case 'Linija_7_Smer_B_nedelja_i_praznici':
      return '';

    case 'Linija_8_Smer_A_radni_dan':
      return '';
    case 'Linija_8_Smer_B_radni_dan':
      return '';
    case 'Linija_8_Smer_B_radni_dan_Tatra':
      return 'od Tatravagonke';

    case 'Linija_8A_Smer_A_radni_dan':
      return '';
    case 'Linija_8A_Smer_B_radni_dan':
      return '';

    case 'Linija_9_Smer_A_radni_dan':
      return '';
    case 'Linija_9_Smer_B_radni_dan':
      return '';

    case 'Linija_10_Smer_A_radni_dan':
      return '';
    case 'Linija_10_Smer_B_radni_dan':
      return '';

    case 'Linija_16_Smer_A_radni_dan':
      return '';
    case 'Linija_16_Smer_B_radni_dan':
      return '';
    case 'Linija_16_Smer_A_nedelja_i_praznici':
      return '';
    case 'Linija_16_Smer_B_nedelja_i_praznici':
      return '';
    default:
      return routeId;
  }
};
