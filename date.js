class InputMask {
	constructor(elem, placeholder, separator, placeholderNone, majority){
  	this.input = document.querySelector(elem);
    this.placeholder = placeholder;
    this.placeholderNone = placeholderNone;
    this.separator = separator;
    this.majority = majority;
    
    this.regDay = new RegExp(`(0[1-9]|[12][0-9]|3[01])`);
    this.regMonth = new RegExp(`(0[1-9]|1[012])`);
    
    this.majority !== 'undefinded' ? this.regYear = new RegExp(`(19[0-9]{2}|2000)`) : this.regYear = new RegExp(`(19[0-9]{2}|20(0|1)[0-9])`);
    
    this.regDayNumber = placeholder.match(/DD/).index;
    this.regMonthNumber = placeholder.match(/MM/).index;
    this.regYearNumber = placeholder.match(/YYYY/).index;
  }
  init() {
     this.dateInputMask();
     this.input.setAttribute('maxlength', '10');
     if(this.placeholderNone !== 'undefined') this.input.setAttribute('placeholder', this.placeholder);
    
     this.input.addEventListener('input', () => {
        this.validatePosition(this.regDayNumber, 2, this.regDay, 'дни верны', 'дни неверны');
        this.validatePosition(this.regMonthNumber, 2, this.regMonth, 'vtczwf верны', 'vtczwf неверны');
        this.validatePosition(this.regYearNumber, 4, this.regYear, 'year верны', 'year неверны');
     })
  }
  dateInputMask() {
   this.input.addEventListener('keypress', e => {
     if(e.keyCode < 47 || e.keyCode > 57) e.preventDefault();
     var len = e.target.value.length;
     
     if((len !== 1 || len !== 3) && e.keyCode == 47) e.preventDefault();
     
     if(len === 2) e.target.value += this.separator;
     if(len === 5) e.target.value += this.separator;
   });
  }

  validatePosition(count, length, data, success, error){
    if(this.input.value.length === count + length){
      this.input.value.slice(count, count + length).match(data) ? console.log(success) : console.log(error);
    }     
  }
}

var inputMask = new InputMask('.input-date', 'MM/DD/YYYY', '/', 1, 18); //input, placeholder, separator, placeholderNone, majority
inputMask.init();