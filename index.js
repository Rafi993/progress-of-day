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

  const setPercentage = (percentage, timing) => {
    progressValue.innerText = `${percentage}%`;
    document.title = `${step.value} - ${percentage}%`;
    completed.style.width = `calc(${percentage}% - 7px)`;

    // Change background image depending of time of day
    switch (timing) {
      case "morning":
        body.style.backgroundImage = "url('images/morning.webp')";
        break;
      case "evening":
        body.style.backgroundImage = "url('images/sunset.webp')";
        break;
      default:
        body.style.backgroundImage = "url('images/night.webp')";
    }
  };

  const computePercentage = () => {
    const currentTime = new Date();
    const currentTimeDifference = endDate.getTime() - currentTime.getTime();
    const percentage = (
      ((totalDifference - currentTimeDifference) / totalDifference) *
      100
    ).toFixed(0);

    const currentHour = currentTime.getHours();
    const morning = 5;
    const afternoon = 16;
    const evening = 18;
    let timing = "morning";

    if (currentHour > morning && currentHour < afternoon) {
      // 5AM - 4PM
      timing = "morning";
    } else if (currentHour > 16 && currentHour < 18) {
      // 4PM - 7PM
      timing = "evening";
    } else {
      // 7PM - 5AM
      timing = "night";
    }

    setPercentage(percentage, timing);

    localStorage.setItem("percentage", percentage);
    localStorage.setItem("timing", timing);
  };

  const storedPercentage = localStorage.getItem("percentage");
  const storedTiming = localStorage.getItem("timing");
  const storedDuration = localStorage.getItem("duration");
  const storedStartDate = localStorage.getItem("startDate");
  const storedEndDate = localStorage.getItem("endDate");
  const storedDifference = localStorage.getItem("totalDifference");

  if (storedPercentage && storedTiming) {
    // Display stored percentage and background image
    setPercentage(storedPercentage, storedTiming);

    if (storedDuration && storedStartDate && storedEndDate) {
      document.title = `${storedDuration} ${storedPercentage}%`;
      startDate = storedStartDate;
      endDate = storedEndDate;
      step.value = storedDuration;
      totalDifference = storedDifference;
    }
  } else {
    // Run first time
    computePercentage();
  }

  // Runs every 5 minutes to update progress of time
  const timer = setInterval(computePercentage, 300000);

  step.addEventListener("change", event => {
    const { value } = event.target;
    document.title = `${value} 0%`;
    const currentDate = new Date();
    switch (value) {
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

    localStorage.setItem("duration", value);
    localStorage.setItem("startDate", startDate);
    localStorage.setItem("endDate", endDate);
    localStorage.setItem("totalDifference", totalDifference);
    // Run it after time duration is changed
    computePercentage();
  });
});
