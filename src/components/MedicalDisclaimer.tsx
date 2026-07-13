// Delad medicinsk ansvarsfriskrivning (YMYL/E-E-A-T). Återanvänds på
// informationssidor så att samma text och 112/1177-hänvisning alltid visas.
export function MedicalDisclaimer() {
  return (
    <div className="warning-card mt-10 p-5 text-sm">
      <strong>Observera:</strong> Informationen på denna sida är allmän och ersätter inte
      bedömning av läkare. Vid akuta besvär, ring 112. För sjukvårdsrådgivning, ring 1177.
    </div>
  );
}
