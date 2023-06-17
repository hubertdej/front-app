import { Container } from '@cloudscape-design/components';
import ShowMoreText from 'react-show-more-text';
import { EquityDetails } from '../../models/equity-details';

function CompanyDescription( props: { equityDetails: EquityDetails | null }) {
  return (
    <Container fitHeight={true} header={
      <div style={{ fontSize: '14px', fontWeight: 'bold' }}>
                Company Description
      </div>
    }
    >
      <ShowMoreText
        lines={2}
        more="Show more"
        less="Show less"
        anchorClass="show-more-less-clickable"
        expanded={false}
        truncatedEndingComponent={'... '}
      >
        {props.equityDetails?.summary}
      </ShowMoreText>
    </Container>
  );
}

export default CompanyDescription;
