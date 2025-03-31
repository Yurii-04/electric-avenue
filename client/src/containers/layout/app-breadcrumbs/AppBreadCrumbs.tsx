import { Link, Params, useMatches } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { Breadcrumbs } from '@mui/material';
import { styles } from '~/containers/layout/app-breadcrumbs/styles';
import Container from '@mui/material/Container';

interface Crumb {
  name: string;
  path?: string;
}

type Crumbfunc = (data: unknown) => Crumb

interface Matches {
  id: string;
  pathname: string;
  params: Params<string>;
  data: unknown;
  handle: {
    crumb: Crumb | Crumbfunc
  };
}

const AppBreadCrumbs = () => {
  const matches = useMatches() as Matches[];
  const crumbs = matches
    .filter((match) => Boolean(match.handle?.crumb))
    .map((match) =>
      typeof match.handle.crumb === 'function'
        ? match.handle.crumb(match.data)
        : match.handle.crumb,
    )
    .flat();

  const breadCrumbs = crumbs.map((crumb, idx) => {
    const isLast = idx === crumbs.length - 1
    const component = isLast ? Typography : Link

    return (
      <Typography
        component={component}
        data-testid='breadCrumb'
        key={crumb.name}
        sx={isLast ? styles.link : styles.previous}
        to={crumb.path}
      >
        {crumb.name}
      </Typography>
    )
  })

  const separator = <Typography sx={styles.separator} />

  return crumbs.length > 1 ? (
    <Container maxWidth='xl' sx={styles.root}>
      <Breadcrumbs separator={separator} sx={styles.breadCrumbs}>
        {breadCrumbs}
      </Breadcrumbs>
    </Container>
  ) : null
};

export default AppBreadCrumbs;