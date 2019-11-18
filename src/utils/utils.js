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
