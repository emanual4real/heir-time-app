import { useEffect } from 'react';
import { ItemCarousel } from '..';
import { useGetOwnProjectsQuery, useGetSelfQuery } from '@ui/services';
import { selectCurrentProject, selectIsProjectOwner, setCurrentProject } from '@ui/state';
import { useDispatch, useSelector } from 'react-redux';

export const Home = () => {
  const dispatch = useDispatch();
  const { data: user } = useGetSelfQuery();
  const { data: projects, isSuccess } = useGetOwnProjectsQuery();
  const currentProject = useSelector(selectCurrentProject);
  const projectOwner = useSelector(selectIsProjectOwner);

  console.log('projectOwner', projectOwner);

  useEffect(() => {
    if (projects) {
      const defaultProject = projects[0].id;

      dispatch(setCurrentProject(defaultProject));
    }
  }, [dispatch, projects]);

  if (user === undefined) {
    return <div>Home Page in Progress</div>;
  }

  if (isSuccess) {
    return (
      <div>
        <ul>
          Project List
          {projects?.map((project) => <li key={project.id}>{project.projectName}</li>)}
        </ul>
        {currentProject ? <ItemCarousel projectId={currentProject} isAdmin={false} /> : null}
      </div>
    );
  }
};
