import Swal from "sweetalert2";

// Sweet Nanya yes or nott
export const SweetNanya = (title, text) => {
  return Swal.fire({
    title: title,
    text: text,
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#7E3AF2",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes!",
    background: "#252832",
    color: "#fff",
  });
};

// sweet alert loading
export const SweetLoading = () => {
  return Swal.fire({
    title: "Loading...",
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
    },
    background: "#252832",
    color: "#fff",
  });
};

// sweettt alert OK ato suksesss
export const SweetOK = (title) => {
  return Swal.fire({
    title: title,
    icon: "success",
    showConfirmButton: true,
    confirmButtonColor: "#7E3AF2",
    background: "#252832",
    color: "#fff",
  });
};

// sweet alert Error ,gagal
export const SweetError = (title, text) => {
  return Swal.fire({
    title: title,
    text: text,
    icon: "error",
    showConfirmButton: true,
    background: "#252832",
    color: "#fff",
  });
};
