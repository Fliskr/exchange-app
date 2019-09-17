export default function(blob: Blob, name: string = "blank.pdf")  {

    // IE11 support
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob, name);
        return;
    }

    const href = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    // timeout for Firefox
    setTimeout(() => {
        window.URL.revokeObjectURL(href);
        document.body.removeChild(link);
    }, 100);
}
