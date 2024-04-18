import { ItemCarousel } from '..';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getOwnProjects } from '@ui/services';
import { User } from '@ui/types';

export const Home = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<User>(['me']);
  const { data, isSuccess } = useQuery({
    queryKey: ['project'],
    queryFn: getOwnProjects,
    enabled: !!user
  });

  if (user === undefined) {
    return <div>Home Page in Progress</div>;
  }

  if (isSuccess) {
    return (
      <div>
        <ul>
          Project List
          {data?.map((project) => <li key={project.id}>{project.projectName}</li>)}
        </ul>
        <ItemCarousel projectId={data[0].id} isAdmin={false} />
      </div>
    );
  }
};
