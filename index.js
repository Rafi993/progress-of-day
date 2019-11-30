window.addEventListener("DOMContentLoaded", () => {
  const step = document.getElementById("step");
  const progressValue = document.getElementById("progress-value");
  const completed = document.getElementById("completed");
  const body = document.getElementsByTagName("body")[0];

  progressValue.innerText = "0%";
  completed.style.width = "0%";

  let startDate = new Date();
  let endDate = new Date();
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(23, 59, 59, 999);
  let totalDifference = endDate.getTime() - startDate.getTime();

  // Runs every one second to update progress of time
  const timer = setInterval(() => {
    const currentTime = new Date();
    const currentTimeDifference = endDate.getTime() - currentTime.getTime();
    const percentage = (
      ((totalDifference - currentTimeDifference) / totalDifference) *
      100
    ).toFixed(0);

    progressValue.innerText = `${percentage}%`;
    document.title = `${step.value} - ${percentage}%`;
    completed.style.width = `calc(${percentage}% - 7px)`;

    const currentHour = currentTime.getHours();
    const morning = 5;
    const afternoon = 16;
    const evening = 18;

    // Change background image depending of time of day
    if (currentHour > morning && currentHour < afternoon) {
      // 5AM - 4PM
      body.style.backgroundImage = "url('images/morning.jpg')";
    } else if (currentHour > 16 && currentHour < 18) {
      // 4PM - 7PM
      body.style.backgroundImage = "url('images/sunset.jpg')";
    } else {
      // 7PM - 5AM
      body.style.backgroundImage = "url('images/night.jpg')";
    }
  }, 1000);

  step.addEventListener("change", event => {
    document.title = `${event.target.value} 0%`;
    const currentDate = new Date();
    switch (event.target.value) {
      case "Week":
        startDate = new Date(
          currentDate.setDate(currentDate.getDate() - currentDate.getDay())
        );
        endDate = new Date(
          currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 6)
        );
        break;
      case "Month":
        startDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          1
        );
        endDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
          0
        );
        break;
      case "Year":
        startDate = new Date(new Date().getFullYear(), 0, 1);
        endDate = new Date(new Date().getFullYear(), 11, 31);
        break;
      default:
        startDate = new Date();
        endDate = new Date();
    }

    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);
    totalDifference = endDate.getTime() - startDate.getTime();
  });
});
