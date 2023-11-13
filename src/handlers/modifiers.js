export function setDrivePowerPointValue({ selectedSubject, dispatch, lessonsData, selectedLevel, drivePowerPoint, setLessons }) {
  if (drivePowerPoint) {
    selectedSubject = selectedSubject?.split('@@')?.[0];

    const payload = {
      ...lessonsData,
    }

    payload[selectedLevel][selectedSubject].drivePowerPoint  = drivePowerPoint;
    payload.length = Object.keys(payload);

    dispatch(setLessons(payload));
  }
}