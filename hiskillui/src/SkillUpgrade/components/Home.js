import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  HvTypography,
  HvInput,
  HvCard,
  HvCardHeader,
  HvCardMedia,
  HvActionBar,
  HvCheckBox,
  HvToggleButton,
  HvActionsGeneric,
  HvPanel,
  HvBox,
} from '@hitachivantara/uikit-react-core';
import { FavoriteSelected, Favorite } from '@hitachivantara/uikit-react-icons';

const Home = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  const handleViewCourse = (courseId) => {
    navigate(`/CourseDetails/${courseId}`);
  };

  useEffect(() => {
    // Fetch data from the backend API
    fetchCourses()
      .then((data) => setCourses(data))
      .catch((error) => console.error(error));
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/coursecards/get');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch courses');
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const filteredCourses = courses.filter((course) =>
    course.courseName.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <>
      <div style={{ flex: "1", paddingLeft: "250px", paddingRight: "30px", backgroundColor: "#edf1f1" }}>
        <HvPanel style={{ width: "100%", borderBottom: "3px solid black", backgroundColor: "#fefefe", }}>
          <div style={{ paddingRight: "10px" }}>
            <HvCard bgcolor="atmo1" statusColor="negative" style={{ width: "100%" }} />
            <HvTypography variant="title1" style={{ justifyContent: 'center', paddingTop: 20 }}>
              Welcome to Skill Upgrade!
            </HvTypography>
          </div>

          <div style={{ padding: 5, margin: 30 }}>
            <HvTypography variant="title4">Expand Your Knowledge and Enhance Your Skills with Skill Upgrade - Your Ultimate Destination for Learning New Tech Skills.</HvTypography>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <HvInput
              aria-label="Search Skills data"
              classes={{
                root: 'css-8atqhb',
              }}
              onEnter={() => { }}
              placeholder="Search"
              suggestionListCallback={() => { }}
              type="search"
              style={{ width: '200px', marginBottom: 20 }}
              value={searchInput}
              onChange={handleSearchInputChange}
            />
          </div>
        </HvPanel>
      </div>

      <div style={{ paddingLeft: "250px", paddingRight: "30px", backgroundColor: "#edf1f1" }}>
        <HvCard bgcolor="atmo1" >
          <HvBox sx={{ marginBottom: "var(--uikit-space-sm)", marginTop: 20 }}>
            <HvTypography variant="title3" style={{ paddingTop: 20 }}>Available Courses</HvTypography>
            <div className="App" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', minHeight: '100vh' }}>
              <div style={{ display: 'inline-flex' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px', paddingLeft: 20 }}>
                  {filteredCourses.map((course) => (
                    <div key={course.id} style={{ margin: '35px' }}>
                      <HvCard bgcolor="atmo1" selectable style={{ width: '360px' }}>
                        <HvCardHeader subheader="Course" title={course.courseName} />
                        <HvCardMedia alt="Compressor" component="img" height={180} image={course.image} />
                        <HvActionBar>
                          <HvCheckBox inputProps={{ 'aria-label': 'leaf input' }} onChange={() => { }} value="value" />
                          <div style={{ height: '32px', width: '32px' }}>
                            <HvToggleButton
                              aria-label="Star"
                              notSelectedIcon={<Favorite />}
                              selectedIcon={<FavoriteSelected />}
                            />
                          </div>

                          <div style={{ flex: 1 }} />
                          <HvActionsGeneric
                            actions={[
                              {
                                id: 'view',
                                label: 'View',
                                onClick: () => handleViewCourse(course.id),
                              },
                            ]}
                          />
                        </HvActionBar>
                      </HvCard>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </HvBox>
        </HvCard>
      </div>
    </>
  );
};

export default Home;