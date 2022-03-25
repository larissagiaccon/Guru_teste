import Skeleton from 'skeleton';

import { Container } from './styles';

export function UserItemSkeleton() {
  return (
    <>
      {Array(10)
        .fill(0)
        .map((__, index) => (
          <Container
            key={index}
            className="skeleton-container"
            data-testid="skeletonContainer"
          >
            <Skeleton
              className="skeleton-item name"
              data-testid="skeletonComponent"
            />
            <Skeleton
              className="skeleton-item email"
              data-testid="skeletonComponent"
            />
            <Skeleton
              className="skeleton-item actions"
              data-testid="skeletonComponent"
            />
          </Container>
        ))}
    </>
  );
}
