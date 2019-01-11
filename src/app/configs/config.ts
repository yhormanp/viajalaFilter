export const configurations = {
  baseApiUrl: " https://viajala.com.co/services/flight/best-price",
  countryOrigin: 'CO',

  defaultOrigins: [
    { iata: "BOG", name: "Bogot\u00e1" },
    // { iata: "ADZ", name: "San Andr\u00e9s, Colombia (ADZ)" },
    // { iata: "CTG", name: "Cartagena, Colombia (CTG)" },
    // { iata: "SMR", name: "Santa Marta, Colombia (SMR)" },
    { iata: "MDE", name: "Medell\u00edn" }
  ],

  defaultDestination: [
    { iata: "CTG", name: "Cartagena" },
    { iata: "SMR", name: "Santa Marta" },
    { iata: "ADZ", name: "San Andr\u00e9s" },
    ],
   
  availableMonths:[
    
    {name: 'Enero', value: "01"},
    {name: 'Febrero', value: "02"},
    {name: 'Marzo', value: "03"},
    {name: 'Abril', value: "04"},
    {name: 'Mayo', value: "05"},
    {name: 'Junio', value: "06"},
    {name: 'Julio', value: "07"},
    {name: 'Agosto', value: "08"},
    {name: 'Septiembre', value: "09"},
    {name: 'Octubre', value: "10"},
    {name: 'Noviembre', value: "11"},
    {name: 'Diciembre', value: "12"},



  ]

  
};
