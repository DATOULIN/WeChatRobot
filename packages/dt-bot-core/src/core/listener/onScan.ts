import { qrcodeValueToImageUrl, ScanStatus } from 'wechaty';
const QrcodeTerminal = require('qrcode-terminal');

export const onScan = (qrcode: string, status: ScanStatus) => {
	if (status === ScanStatus.Waiting) {
		console.log(
			`Scan QR Code to login: ${status}\n ${qrcodeValueToImageUrl(qrcode)}`
		);
		QrcodeTerminal.generate(qrcode, { small: true });
	}
};
