export const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

export const validNumberRegex = RegExp(/^\+?(0|[1-9]\d*)$/);

export function validationFailed(obj) {
  for (var key in obj) {
    if (obj[key]) return true;
  }
  return false;
}

export function getYear(timstamp) {
  var d = new Date(timstamp);
  return d.getFullYear();

}