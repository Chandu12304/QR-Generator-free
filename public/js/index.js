function downloadFile() {
    // Create a hidden link element
    const link = document.createElement('a');
    link.href = '/download'; // Points to the download route
    link.download = ''; /* This attribute is necessary to trigger download (What happens here? When the user clicks this link, the browser either opens the file in a new tab or starts downloading it, depending on the file type and browser settings.
                        The download attribute: This tells the browser to download the file rather than just navigating to it or displaying it.)*/

    // Append the link to the body
    document.body.appendChild(link);

    // Trigger the download by clicking the link
    link.click();

    // Removing the 'a' from the document after the download starts
    document.body.removeChild(link);
}
