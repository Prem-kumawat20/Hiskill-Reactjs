import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import {
  HvTypography,
  HvCard,
  HvPanel,
  HvBox,
  HvListContainer,
  HvListItem,
  HvAccordion,
  HvProgressBar,
  HvButton,
  HvTextArea,
  HvDropdown,
} from "@hitachivantara/uikit-react-core";
import {
  CompletedStep,
  PlayVideo,
  Code,
  Bookmark,
  Contract,
  MultiDevices,
  Doc,
} from "@hitachivantara/uikit-react-icons";

const Coursedetails = () => {
  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showDropdown, setDropdown] = useState(false);
  const [showCustomForm, setCustomForm] = useState(false);
  const [employeeNames, setEmployeeNames] = useState([]);
  const [employeeName, setEmployeeName] = useState("");
  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  // eslint-disable-next-line
  const [customizeNow, setCustomizeNow] = useState([]);
  const [progress, setProgress] = useState(0);
  const [weekCompletionStatus, setWeekCompletionStatus] = useState({});

  const { id } = useParams();

  const handleAssignbuttonClick = () => {
    setShowForm(true);
  };

  const handleDropdownButtonClick = () => {
    setDropdown(true);
  };

  const handleCustomButtonClick = () => {
    setCustomForm(true);
  };

  useEffect(() => {
    fetchEmployeeNames();
  }, []);

  const fetchEmployeeNames = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/Assigncourse/get');
      const data = response.data;
      const names = data.map((item) => item.employeeName);
      const uniqueArray = [...new Set(names)];
      setEmployeeNames(uniqueArray);

    } catch (error) {
      console.error('Error fetching employee names:', error);
    }
  };

  const handleAssignSubmit = (event) => {
    event.preventDefault();
    const simpleForm = {
      employeeName,
      courseName,
      description,
    }
    axios
      .post('http://localhost:8080/api/v1/Assigncourse/post', simpleForm)
      .then((response) => {
        setShowForm(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleAssignCancel = () => {
    setEmployeeName("");
    setCourseName("");
    setDescription("");
    setShowForm(false);
  };

  const handleDropdownCancel = () => {
    setDropdown(false);
  };

  const handleCustomCancel = () => {
    setCustomForm(false);
  };

  useEffect(() => {
    fetchCustomizeEmployeeNames();
  }, []);

  const fetchCustomizeEmployeeNames = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/customizecourses/get');
      const data = response.data;
      const names = data.map((item) => item.employeeName);
      const uniqueCustomizeArray = [...new Set(names)];
      setEmployeeNames(uniqueCustomizeArray);

    } catch (error) {
      console.error('Error fetching employee names:', error);
    }
  };

  const onChange = (selectedValues) => {
    const customizedValues = selectedValues.map((value) => value.label);
    setCustomizeNow(customizedValues);

    const customForm = {
      employeeName: employeeName,
      customizeNow: customizedValues,
    };

    axios
      .post("http://localhost:8080/api/v1/customizecourses/post", customForm)
      .then((response) => {
        console.log("Data submitted successfully");
        setCustomForm(false);
      })
      .catch((error) => {
        console.error("Failed to submit data", error);
      });
  };

  const onToggle = () => {
    console.log("Dropdown toggled");
  };

  const onClickOutside = () => {
    console.log("Clicked outside dropdown");
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/courses/get/${id}`)
      .then((response) => {
        const data = response.data;
        const coursesArray = [data]
        setCourses(coursesArray);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/coursecards/get/${id}`);
        const fetchedProgress = response.data.courseProgress;
  
        setProgress(fetchedProgress);
        setWeekCompletionStatus(response.data.weekCompletionStatus);
      } catch (error) {
        console.error("Error fetching progress:", error);
      }
    };
  
    fetchProgress();
  }, [id]);

  const handleCompleteWeek = async (week) => {
    if (progress < 100) {
      let updatedProgress = progress;
      const updatedWeekCompletionStatus = { ...weekCompletionStatus };
  
      if (!updatedWeekCompletionStatus[week]) {
        updatedProgress += 33;
        updatedWeekCompletionStatus[week] = true;
  
        try {
          await axios.put(`http://localhost:8080/api/v1/coursecards/put/${id}`, {
            courseProgress: updatedProgress,
            weekCompletionStatus: updatedWeekCompletionStatus,
          });
  
          setProgress(updatedProgress);
          setWeekCompletionStatus(updatedWeekCompletionStatus);
  
          if (Object.values(updatedWeekCompletionStatus).every((completed) => completed)) {
            setProgress(100);
          }
        } catch (error) {
          console.error("Error updating progress:", error);
        }
      }
    }
  };  

  const handleResetProgress = async () => {
    try {
      await axios.put(`http://localhost:8080/api/v1/coursecards/put/${id}`, {
        courseProgress: 0,
        weekCompletionStatus: {
          1: false,
          2: false,
          3: false,
        },
      });

      setProgress(0);
      setWeekCompletionStatus({
        1: false,
        2: false,
        3: false,
      });
    } catch (error) {
      console.error("Error resetting progress:", error);
    }
  };

  const totalCompletedWeeks =
  (weekCompletionStatus['1'] ? 1 : 0) +
  (weekCompletionStatus['2'] ? 1 : 0) +
  (weekCompletionStatus['3'] ? 1 : 0);

const adjustedProgress = totalCompletedWeeks === 3 ? 100 : progress;


  return (
    <>
      <div style={{ flex: "1", paddingLeft: "250px", paddingRight: "30px", backgroundColor: "#edf1f1" }}>
        <HvPanel style={{ width: "100%", borderBottom: "3px solid black", backgroundColor: "#fefefe", }}>
          <div style={{ paddingRight: "10px" }}>
            <HvCard bgcolor="atmo1" statusColor="negative" style={{ width: "100%" }} />
            <HvTypography variant="title1" style={{ justifyContent: "center", alignItems: "center", paddingTop: 40, paddingBottom: 30, display: "flex", color: "#141482" }} >
              Welcome to Course -
              {courses.map((ele, index) => (
                <div key={index} style={{ paddingLeft: 5, color: "#141482" }}>
                  {ele.skillname}
                </div>
              ))}
            </HvTypography>
          </div>

          <div style={{ padding: 5 }}>
            {courses.map((ele, index) => (
              <HvTypography key={index} variant="title4">{ele.about}</HvTypography>
            ))}
          </div>

          <div style={{ display: "flex", paddingTop: 20 }}>
            <div style={{ width: "50%", padding: 5 }}>
              <HvTypography variant="label">Created By</HvTypography>
              <HvTypography>Joseph Lio</HvTypography>
            </div>

            <div style={{ width: "50%", padding: 5 }}>
              <HvTypography variant="label">Last Updated</HvTypography>
              <HvTypography>Aug 30, 2023</HvTypography>
            </div>

            <div style={{ width: "50%", padding: 5 }}>
              <HvTypography variant="label">Language</HvTypography>
              <HvTypography>English</HvTypography>
            </div>
          </div>
        </HvPanel>
      </div>

      {/* What you will learn */}
      <div style={{ marginTop: 20, display: "flex", flexDirection: "row", flex: "1", paddingLeft: "250px", paddingRight: "30px", backgroundColor: "#edf1f1" }}>
        <HvCard bgcolor="atmo1" style={{ flex: 1, marginRight: 5 }}>
          <HvBox sx={{ marginBottom: "var(--uikit-space-sm)", marginTop: 20 }}>
            <HvTypography variant="title3">What we will Learn</HvTypography>
            <div style={{ backgroundColor: "var(--uikit-colors-atmo1)", padding: 20, alignItems: "flex-start" }}>
              <HvListContainer interactive="true">
                {courses.map((ele, index) => (
                  <div key={index}>
                    <div>
                      <pre style={{ alignItems: "flex-start", fontFamily: "inherit", marginLeft: 0 }}>{ele.learning.join("\n\n")}</pre>
                    </div>
                  </div>
                ))}
              </HvListContainer>
            </div>
          </HvBox>
        </HvCard>

        {/* Course details */}
        <HvCard bgcolor="atmo1" style={{ flex: "0 0 30%", marginRight: 5 }}>
          <HvBox sx={{ marginBottom: "var(--uikit-space-sm)", marginTop: 20 }}>
            <HvTypography variant="title3">Course details</HvTypography>
            <div style={{ backgroundColor: "var(--uikit-colors-atmo1)", padding: 20 }}>
              <HvListContainer interactive="true">
                {courses.map((ele) => {
                  return (
                    <div key={ele.skillname}>
                      <HvListItem startAdornment={<PlayVideo />}>Total time - {ele.totalTime} hrs</HvListItem>
                      <HvListItem startAdornment={<Code />}>No. of exercises - {ele.exercises}</HvListItem>
                      <HvListItem startAdornment={<Bookmark />}>No. of articles - {ele.articles}</HvListItem>
                      <HvListItem startAdornment={<Contract />}>Certification - {ele.certificate}</HvListItem>
                    </div>
                  );
                })}
              </HvListContainer>
            </div>
          </HvBox>
        </HvCard>
      </div>

      {/* Course Content */}
      <div style={{ marginTop: 20, display: "flex", flexDirection: "row", flex: "1", paddingLeft: "250px", paddingRight: "30px", backgroundColor: "#edf1f1" }}>
        <HvCard bgcolor="atmo1" style={{ width: "100%", marginRight: 5, }} >
          <HvBox sx={{ marginBottom: "var(--uikit-space-sm)", marginTop: 20 }}>
            <HvTypography variant="title3">Course Content</HvTypography>
          </HvBox>

          {/* Progress Bar */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ alignItems: "center", display: "flex", flexDirection: "column", justifyContent: "space-around", margin: "auto", marginBottom: 40, marginTop: 20, width: 400 }}>
              <HvTypography variant="label">
                See Your Progress Here!
              </HvTypography>
              <HvProgressBar value={progress} label={totalCompletedWeeks === 3 ? "100%" : `${adjustedProgress.toFixed(2)}% (${totalCompletedWeeks} week(s) completed)`} />
            </div>
          </div>

          {/* Buttons */}
          <div>
            <div>
              <HvButton onClick={handleResetProgress} disabled={progress === 0} style={{ margin: "0 10px", width: 150, marginBottom: 30 }} >
                Reset Progress
              </HvButton>
            </div>

            <div>
              <HvButton onClick={handleAssignbuttonClick} variant="primarySubtle" style={{ margin: "0 10px", width: 150 }} >
                Assign course
              </HvButton>
              <div>
                {!showForm ? (
                  <div style={{ paddingTop: 10, paddingBottom: 30, }}>
                    Assign this course to someone.
                  </div>
                ) : (
                  <div style={{ paddingTop: 20, paddingBottom: 30 }}>
                    <form onSubmit={handleAssignSubmit} style={{ border: "1px solid #ccc", padding: 10, width: 500, marginLeft: 'auto', marginRight: 'auto' }} >
                      <div style={{ width: 480, paddingBottom: 10, display: "flex", marginBottom: 10, overflowX: 'auto', }} >
                        <label htmlFor="employeeName" style={{ flexBasis: "30%", }} >
                          Employee Name:
                        </label>
                        <select
                          style={{ flex: 1, border: "1px solid #333", borderRadius: 2, padding: '5px 30px 5px 5px', width: 200 }}
                          id="employeeName"
                          value={employeeName}
                          onChange={(e) => setEmployeeName(e.target.value)}
                          required
                        >
                          <option value="">Select an Employee</option>
                          {employeeNames.map((name) => (
                            <option key={name} value={name}>
                              {name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div style={{ width: '100%', paddingBottom: 10, display: "flex", marginBottom: 10, overflowX: 'auto' }} >
                        <label htmlFor="courseName" style={{ flexBasis: "30%" }} >
                          Course Name:
                        </label>
                        <div style={{ flex: 1, padding: 5 }}>
                          <HvTextArea
                            id="courseName"
                            value={courseName}
                            placeholder="Enter course name"
                            onChange={(e) => setCourseName(e.target.value)}
                            required
                            style={{ width: '100%' }}
                          />
                        </div>
                      </div>

                      <div style={{ width: '100%', paddingBottom: 10, display: "flex", marginBottom: 10, overflowX: 'auto' }} >
                        <label htmlFor="description" style={{ flexBasis: "30%", }} >
                          Description:
                        </label>
                        <div style={{ flex: 1, padding: 5, width: 'calc(100% - 30px)' }} >
                          <HvTextArea
                            id="description"
                            value={description}
                            placeholder="Enter description"
                            resizable
                            rows={5}
                            style={{ width: '100%' }}
                            onChange={(e) => setDescription(e.target.value)}
                          />
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <HvButton type="submit" variant="primarySubtle" style={{ margin: "0 10px", width: 100, marginRight: 20, }} >
                          Submit
                        </HvButton>

                        <HvButton onClick={handleAssignCancel} variant="primarySubtle" style={{ margin: "0 10px", width: 100, marginRight: 20, }} >
                          Cancel
                        </HvButton>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>

            <HvButton onClick={handleCustomButtonClick} variant="primarySubtle" style={{ margin: "0 10px", width: 150 }}>
              Customize Course
            </HvButton>
            <div>
              {!showCustomForm ? (
                <div style={{ paddingTop: 10, paddingBottom: 30 }}>
                  Customize this course.
                </div>
              ) : (
                <div style={{ paddingTop: 20, paddingBottom: 30, display: 'flex', justifyContent: 'center' }}>
                  <form style={{ border: "1px solid #ccc", padding: 10, width: 500, marginLeft: "auto", marginRight: "auto", }} >
                    <div style={{ width: "100%", paddingBottom: 10, display: "flex", marginBottom: 10, overflowX: 'auto' }} >
                      <label htmlFor="employeeName" style={{ flexBasis: "30%" }} >
                        Employee Name:
                      </label>
                      <select
                        style={{ flex: 1, border: "1px solid #333", borderRadius: 2, padding: '5px 30px 5px 5px', width: "200px", }}
                        id="employeeName"
                        value={employeeName}
                        onChange={(e) => setEmployeeName(e.target.value)}
                        required
                      >
                        <option value="">Select an Employee</option>
                        {employeeNames.map((name) => (
                          <option key={name} value={name}>
                            {name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', marginRight: 20 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: 220, width: '100%' }}>
                        <HvButton onClick={handleDropdownButtonClick} variant="primarySubtle" style={{ width: 110, }}>
                          Customize Now
                        </HvButton>
                      </div>
                      <div>
                        {showDropdown && (
                          <div style={{ top: '100%', left: '50%', transform: 'translateX(-50%)', zIndex: 2 }}>
                            <div style={{ width: 310 }}>
                              <HvDropdown
                                aria-label="Main sample"
                                expanded
                                multiSelect
                                onCancel={handleDropdownCancel}
                                onChange={onChange}
                                onClickOutside={onClickOutside}
                                onToggle={onToggle}
                                showSearch
                                status="valid"
                                style={{ width: 450, whiteSpace: 'pre-wrap' }}
                                maxHeight={100}
                                values={courses.flatMap((course, index) =>
                                  Object.keys(course.plan).flatMap((weekKey) =>
                                    Object.keys(course.plan[weekKey].days).flatMap((dayKey) => {
                                      const day = course.plan[weekKey].days[dayKey];
                                      return day.details.map((detail, detailIndex) => ({
                                        label: detail,
                                        selected: course.selected || false
                                      }));
                                    })
                                  )
                                )}
                              />
                            </div>
                          </div>)}
                      </div>

                      <HvButton onClick={handleCustomCancel} variant="primarySubtle" style={{ width: 100 }} >
                        Cancel
                      </HvButton>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>

          {/* Weekwise Plans */}
          {courses.map((ele, index) => {
            return (
              <div key={ele.skillname}>
                <div style={{ paddingLeft: 40, paddingBottom: 10 }}>
                  {ele.plan && ele.plan.Week1 && (
                    <div>
                      <HvAccordion
                        key={`${ele.skillname}-week1`}
                        headingLevel={4}
                        id="item1"
                        label={`${ele.plan.Week1.label} - ${ele.plan.Week1.about}`}
                        style={{ cursor: "pointer", padding: "10px", width: "100%", border: "none", textAlign: "left", outline: "none", }}>

                        <HvButton onClick={() => handleCompleteWeek(1)} disabled={weekCompletionStatus[1] || progress >= 100} style={{ marginLeft: 40 }}>
                          {weekCompletionStatus[1] ? "Completed" : "Mark as Completed (Week 1)"}
                        </HvButton>

                        {ele.plan.Week1.days &&
                          Object.keys(ele.plan.Week1.days).map((dayKey) => (
                            <HvAccordion
                              key={`${ele.skillname}-week1-${dayKey}`}
                              headingLevel={4}
                              id="item1"
                              label={`${ele.plan.Week1.days[dayKey].dLabel} - ${ele.plan.Week1.days[dayKey].name}`}
                              style={{ cursor: "pointer", padding: "10px", width: "100%", border: "none", textAlign: "left", outline: "none" }}>
                              <div style={{ paddingLeft: 40 }}>
                                <HvListContainer condensed interactive="true">
                                  <HvTypography style={{ paddingLeft: 20, fontWeight: "bold" }}>
                                    Details
                                  </HvTypography>
                                  <div style={{ paddingLeft: 40, paddingBottom: 10, }} >
                                    <HvListItem startAdornment={<MultiDevices />} style={{ float: "left" }}>
                                      {ele.plan.Week1.days[dayKey] && ele.plan.Week1.days[dayKey].mode && ele.plan.Week1.days[dayKey].mode.length >= 2 && (
                                        <>
                                          mode - {ele.plan.Week1.days[dayKey].mode[0]}/{ele.plan.Week1.days[dayKey].mode[1]}
                                        </>
                                      )}
                                    </HvListItem>
                                    <HvListItem startAdornment={<PlayVideo />} style={{ float: "left" }}>
                                      {ele.plan.Week1.days[dayKey] && (
                                        <>
                                          time - {ele.plan.Week1.days[dayKey].time} mins
                                        </>
                                      )}
                                    </HvListItem>
                                    <HvListItem startAdornment={<CompletedStep />} >
                                      {ele.plan.Week1.days[dayKey] && ele.plan.Week1.days[dayKey]["prerequisites"] && (
                                        <>
                                          prerequisites - {ele.plan.Week1.days[dayKey]["prerequisites"]}
                                        </>
                                      )}
                                    </HvListItem>
                                    <HvListItem startAdornment={<Doc />}>
                                      {ele.plan.Week1.days[dayKey] && ele.plan.Week1.days[dayKey].references && ele.plan.Week1.days[dayKey].references.length >= 2 && (
                                        <>
                                          references -
                                          <a href={"https://www.udemy.com/"} target="_blank" rel="noopener noreferrer">{ele.plan.Week1.days[dayKey].references[0]}</a>
                                          <a href={"https://www.coursera.com/"} target="_blank" rel="noopener noreferrer">{ele.plan.Week1.days[dayKey].references[1]}</a>
                                        </>
                                      )}
                                    </HvListItem>

                                    <HvTypography style={{ paddingTop: 20, fontWeight: "bold", }}>
                                      Target-
                                    </HvTypography>
                                    <div key={index} style={{ padding: "10px", width: "100%", border: "none", textAlign: "left", outline: "none", }} >
                                      <div>
                                        <pre id="pre" style={{ alignItems: "flex-start", fontFamily: "inherit", whiteSpace: "pre-wrap", padding: 0, }} >
                                          {ele.plan && ele.plan.Week1 && ele.plan.Week1.days && ele.plan.Week1.days[dayKey] && ele.plan.Week1.days[dayKey].details && ele.plan.Week1.days[dayKey].details.join("\n")}
                                        </pre>
                                      </div>
                                    </div>
                                  </div>
                                </HvListContainer>
                              </div>
                            </HvAccordion>
                          ))}
                      </HvAccordion>
                    </div>
                  )}

                  {ele.plan && ele.plan.Week2 && (
                    <div>
                      <HvAccordion
                        key={`${ele.skillname}-week2`}
                        headingLevel={4}
                        id="item1"
                        label={`${ele.plan.Week2.label} - ${ele.plan.Week2.about}`}
                        style={{ cursor: "pointer", padding: "10px", width: "100%", border: "none", textAlign: "left", outline: "none", }} >

                        <HvButton onClick={() => handleCompleteWeek(2)} disabled={weekCompletionStatus[2] || progress >= 100} style={{ marginLeft: 40 }}>
                          {weekCompletionStatus[2] ? "Completed" : "Mark as Completed (Week 2)"}
                        </HvButton>

                        {ele.plan.Week2.days &&
                          Object.keys(ele.plan.Week2.days).map((dayKey) => (
                            <HvAccordion
                              key={`${ele.skillname}-week1-${dayKey}`}
                              headingLevel={4}
                              id="item1"
                              label={`${ele.plan.Week2.days[dayKey].dLabel} - ${ele.plan.Week2.days[dayKey].name}`}
                              style={{ cursor: "pointer", padding: "10px", width: "100%", border: "none", textAlign: "left", outline: "none", }}>
                              <div style={{ paddingLeft: 40 }}>

                                <HvListContainer condensed interactive="true">
                                  <HvTypography style={{ paddingLeft: 20, fontWeight: "bold", }}>
                                    Details
                                  </HvTypography>
                                  <div style={{ paddingLeft: 40, paddingBottom: 10, }}
                                  >
                                    <HvListItem startAdornment={<MultiDevices />} style={{ float: "left" }} >
                                      {ele.plan.Week2.days[dayKey] && ele.plan.Week2.days[dayKey].mode && ele.plan.Week2.days[dayKey].mode.length >= 2 && (
                                        <>
                                          mode - {ele.plan.Week2.days[dayKey].mode[0]}/{ele.plan.Week2.days[dayKey].mode[1]}
                                        </>
                                      )}
                                    </HvListItem>
                                    <HvListItem startAdornment={<PlayVideo />} style={{ float: "left" }}>
                                      {ele.plan.Week1.days[dayKey] && (
                                        <>
                                          time - {ele.plan.Week2.days[dayKey].time} mins
                                        </>
                                      )}
                                    </HvListItem>
                                    <HvListItem startAdornment={<CompletedStep />}>
                                      {ele.plan.Week2.days[dayKey] && ele.plan.Week2.days[dayKey]["prerequisites"] && (
                                        <>
                                          prerequisites - {ele.plan.Week2.days[dayKey]["prerequisites"]}
                                        </>
                                      )}
                                    </HvListItem>
                                    <HvListItem startAdornment={<Doc />} >
                                      {ele.plan.Week2.days[dayKey] && ele.plan.Week2.days[dayKey].references && ele.plan.Week2.days[dayKey].references.length >= 2 && (
                                        <> references -
                                          <a href={"https://www.udemy.com/"} target="_blank" rel="noopener noreferrer">{ele.plan.Week2.days[dayKey].references[0]}</a>
                                          <a href={"https://www.coursera.com/"} target="_blank" rel="noopener noreferrer">{ele.plan.Week2.days[dayKey].references[1]}</a>
                                        </>
                                      )}
                                    </HvListItem>

                                    <HvTypography style={{ paddingTop: 20, fontWeight: "bold", }} >
                                      Target-
                                    </HvTypography>
                                    <div key={index} style={{ padding: "10px", width: "100%", border: "none", textAlign: "left", outline: "none", }} >
                                      <div>
                                        <pre id="pre" style={{ alignItems: "flex-start", fontFamily: "inherit", whiteSpace: "pre-wrap", padding: 0, }} >
                                          {ele.plan && ele.plan.Week2 && ele.plan.Week2.days && ele.plan.Week2.days[dayKey] && ele.plan.Week2.days[dayKey].details && ele.plan.Week2.days[dayKey].details.join("\n")}
                                        </pre>
                                      </div>
                                    </div>
                                  </div>
                                </HvListContainer>
                              </div>
                            </HvAccordion>
                          ))}
                      </HvAccordion>
                    </div>
                  )}

                  {ele.plan && ele.plan.Week3 && (
                    <div>
                      <HvAccordion
                        key={`${ele.skillname}-week3`}
                        headingLevel={4}
                        id="item1"
                        label={`${ele.plan.Week3.label} - ${ele.plan.Week3.about}`}
                        style={{ cursor: "pointer", padding: "10px", width: "100%", border: "none", textAlign: "left", outline: "none", paddingBottom: 80 }} >

                        <HvButton onClick={() => handleCompleteWeek(3)} disabled={weekCompletionStatus[3] || progress >= 100} style={{ marginLeft: 40 }}>
                          {weekCompletionStatus[3] ? "Completed" : "Mark as Completed (Week 3)"}
                        </HvButton>

                        {ele.plan.Week3.days &&
                          Object.keys(ele.plan.Week3.days).map((dayKey) => (
                            <HvAccordion
                              key={`${ele.skillname}-week1-${dayKey}`}
                              headingLevel={4}
                              id="item1"
                              label={`${ele.plan.Week3.days[dayKey].dLabel} - ${ele.plan.Week3.days[dayKey].name}`}
                              style={{ cursor: "pointer", padding: "10px", width: "100%", border: "none", textAlign: "left", outline: "none", }} >

                              <div style={{ paddingLeft: 40 }}>
                                <HvListContainer condensed interactive="true">
                                  <HvTypography style={{ paddingLeft: 20, fontWeight: "bold", }} >
                                    Details
                                  </HvTypography>
                                  <div style={{ paddingLeft: 40, paddingBottom: 10, }} >
                                    <HvListItem startAdornment={<MultiDevices />} style={{ float: "left" }} >
                                      {ele.plan.Week3.days[dayKey] && ele.plan.Week3.days[dayKey].mode && ele.plan.Week3.days[dayKey].mode.length >= 2 && (
                                        <>
                                          mode - {ele.plan.Week3.days[dayKey].mode[0]}/{ele.plan.Week3.days[dayKey].mode[1]}
                                        </>
                                      )}
                                    </HvListItem>
                                    <HvListItem startAdornment={<PlayVideo />} style={{ float: "left" }} >
                                      {ele.plan.Week1.days[dayKey] && (
                                        <>
                                          time - {ele.plan.Week3.days[dayKey].time} mins
                                        </>
                                      )}
                                    </HvListItem>
                                    <HvListItem startAdornment={<CompletedStep />}>
                                      {ele.plan.Week3.days[dayKey] && ele.plan.Week3.days[dayKey]["prerequisites"] && (
                                        <>
                                          prerequisites - {ele.plan.Week3.days[dayKey]["prerequisites"]}
                                        </>
                                      )}
                                    </HvListItem>
                                    <HvListItem startAdornment={<Doc />} >
                                      {ele.plan.Week3.days[dayKey] && ele.plan.Week3.days[dayKey].references && ele.plan.Week3.days[dayKey].references.length >= 2 && (
                                        <>
                                          references - <a href={"https://www.udemy.com/"} target="_blank" rel="noopener noreferrer" >{ele.plan.Week3.days[dayKey].references[0]}</a>
                                          <a href={"https://www.coursera.com/"} target="_blank" rel="noopener noreferrer">{ele.plan.Week3.days[dayKey].references[1]}</a>
                                        </>
                                      )}
                                    </HvListItem>

                                    <HvTypography style={{ paddingTop: 20, fontWeight: "bold", }} > Target- </HvTypography>
                                    <div key={index} style={{ padding: "10px", width: "100%", border: "none", textAlign: "left", outline: "none", }} >
                                      <div>
                                        <pre id="pre" style={{ alignItems: "flex-start", fontFamily: "inherit", whiteSpace: "pre-wrap", padding: 0, }} >
                                          {ele.plan && ele.plan.Week3 && ele.plan.Week3.days && ele.plan.Week3.days[dayKey] && ele.plan.Week3.days[dayKey].details && ele.plan.Week3.days[dayKey].details.join("\n")}
                                        </pre>
                                      </div>
                                    </div>
                                  </div>
                                </HvListContainer>
                              </div>
                            </HvAccordion>
                          ))}
                      </HvAccordion>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </HvCard>
      </div>
    </>
  );
};

export default Coursedetails;