
window.PasswordExtension = {
	rule: {
		required: true,
		minlength: 8,
		atLeastOneUpper: true,
		atLeastOneLower: true,
		atLeastOneNumber: true,
		atLeastOneSpecialChar: true,
		noOtherSpecialChars: true,
	},
	messages: {
		required: '<span class="text-error">Choose a password</span>',
		minlength: '<span class="text-error">Password must be at least 8 characters</span>',
		atLeastOneUpper: '<span class="text-error">Password must include at least one uppercase character</span>',
		atLeastOneLower: '<span class="text-error">Password must include at least one lowercase character</span>',
		atLeastOneNumber: '<span class="text-error">Password must include at least one number</span>',
		atLeastOneSpecialChar: '<span class="text-error">Password must include at least one special character in the list !@#$%^&*()_+</span>',
		noOtherSpecialChars: '<span class="text-error">Password can\'t include special characters different from the list !@#$%^&*()_+</span>',
	}
};

$.validator.addMethod(
	"atLeastOneUpper",
	function(value, element) {
		return this.optional(element) || new RegExp("[A-Z]").test(value);
	},
	"* atLeastOneUpper"
);

$.validator.addMethod(
	"atLeastOneLower",
	function(value, element) {
		return this.optional(element) || new RegExp("[a-z]").test(value);
	},
	"* atLeastOneUpper"
);

$.validator.addMethod(
	"atLeastOneNumber",
	function(value, element) {
		return this.optional(element) || new RegExp("[\\d]").test(value);
	},
	"* atLeastOneNumber"
);

$.validator.addMethod(
	"atLeastOneSpecialChar",
	function(value, element) {
		return this.optional(element) || new RegExp("[!#@$%^&*()_+]").test(value);
	},
	"atLeastOneSpecialChar"
);

$.validator.addMethod(
	"noOtherSpecialChars",
	function(value, element) {
		return this.optional(element) || new RegExp('^[a-zA-Z0-9!#@$%^&*()_+]+$').test(value);
	},
	"Please remove special characters"
);			

