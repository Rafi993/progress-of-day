window.addEventListener("DOMContentLoaded", () => {
  const step = document.getElementById("step");
  const progressValue = document.getElementById("progress-value");
  const completed = document.getElementById("completed");

  progressValue.innerText = "0%";
  completed.style.width = "0%";

  let startDate = new Date();
  let endDate = new Date();
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(23, 59, 59, 999);
  let totalDifference = endDate.getTime() - startDate.getTime();

  const timer = setInterval(() => {
    const currentTimeDifference = endDate.getTime() - new Date().getTime();
    const percentage = (
      ((totalDifference - currentTimeDifference) / totalDifference) *
      100
    ).toFixed(0);

    progressValue.innerText = `${percentage}%`;
    document.title = `${step.value} - ${percentage}%`;
    completed.style.width = `${percentage}%`;
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
