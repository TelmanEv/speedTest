let startTime = null;
let endTime = null;
let fileSize = 0;

function calculateSpeed(downloadTime, fileSize) {
  // Calculate network speed in megabits per second (Mbps)
  const speedMbps = (fileSize * 8) / (downloadTime / 1000) / 1000000;
  return speedMbps.toFixed(2);
}

function downloadFile(url) {
  startTime = new Date().getTime();

  return fetch(url)
    .then((response) => {
      // Retrieve the file size from the response headers
      fileSize = parseInt(response.headers.get("content-length")) || 0;
      return response.blob();
    })
    .then((blob) => {
      // Create a temporary URL object to initiate the file download
      const tempURL = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = tempURL;
      a.download = "temp";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    })
    .finally(() => {
      endTime = new Date().getTime();
      const downloadTime = endTime - startTime;

      // Calculate and display the network speed
      const speedMbps = calculateSpeed(downloadTime, fileSize);
      console.log("Network speed:", speedMbps, "Mbps");
    });
}

const imageLink = "https://source.unsplash.com/random?topics=nature";
downloadFile(imageLink);
