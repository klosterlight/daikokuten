import moment from "moment";
import 'moment/locale/es';

moment().locale('es');

export const LeftPad = (value, pad = 2, str = '0') => {
	return Array(pad - String(value).length + 1).join(str) + value;
}

export const ToCurrency = (number = 0, decimalCount = 0) => {
	let toCurrencyRegex = /\d(?=(\d{3})+$)/g;
	if(decimalCount > 0)
		toCurrencyRegex = /\d(?=(\d{3})+\.)/g;
	return '$' + parseFloat(number).toFixed(decimalCount).replace(toCurrencyRegex, '$&,');
}

export const ToDateFormat = (value, format = "DD MMMM YYYY") => {
	return moment.unix(value).format(format);
}

export const ToTimeFormat = (value, format = "HH:mm") => {
	return moment.unix(value).format(format);
}

export const SecondsToTimeFormat = (value) => {
	let secs = parseInt(value / 1000);
	let hours = parseInt( secs / 3600 );
	secs = secs % 3600;
	let minutes = parseInt( secs / 60 );
	secs = secs % 60;
	return `${LeftPad(hours)}:${LeftPad(minutes)}:${LeftPad(secs)}`
}
