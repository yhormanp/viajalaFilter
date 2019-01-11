export interface IBestOffer {
  origin: {
    city: string;
    countryCode: string;
    country: {
      name: string;
      continentCode: string;
      language: string;
      iata: string;
    };
    language: string;
    iata: string;
  };
  destination: {
    city: string;
    countryCode: string;
    country: {
      name: string;
      continentCode: string;
      language: string;
      iata: string;
    };
    language: string;
    iata: string;
  };
  departureTimestamp: string;
  airline: string;
  price: string;
  deeplink: string;
  domain: string;
  currency: {
    code: string;
    displayName: string;
    priceFormat: string;
  };

  formattedPrice: string;
  searchTimestamp: string;
  score: number;
}
