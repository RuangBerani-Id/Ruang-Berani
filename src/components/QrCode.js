import QRCode from 'qrcode';

// Generated on the server from the value stored in the CMS, so editing the link updates the QR automatically.
export default async function QrCode({ url }) {
  const svg = await QRCode.toString(url, { type: 'svg', margin: 1, errorCorrectionLevel: 'M', color: { dark: '#0b2a6f', light: '#ffffff' } });
  return <div className="qr__img" role="img" aria-label={`Kode QR menuju ${url}`} dangerouslySetInnerHTML={{ __html: svg }} />;
}
