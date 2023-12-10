import React, { useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Rating,
  Stack,
  TextField,
  Box,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { toysData } from '../../toysData';
import { Link } from 'react-router-dom'; // <-- Import Link

function FeedbackPage() {
  const { id } = useParams();
  const parsedId = id ?? '-1';
  const toyIndex = parseInt(parsedId, 10);
  const toy = toysData[toyIndex];

  // States for review form fields
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reportedFeedbackId, setReportedFeedbackId] = useState<number | null>(
    null,
  );

  const [showReportForm, setShowReportForm] = useState<number | null>(null);

  // Ensure toy is found, otherwise display not found message
  if (!toy) {
    return <div>Toy not found</div>;
  }

  // Function to handle the reporting of a feedback
  const handleReportClick = (feedbackId: number) => {
    setReportedFeedbackId(feedbackId);
    setShowReportForm(feedbackId);
  };

  return (
    <Container maxWidth="sm">
      <Button
        component={Link}
        to={`/Toys/${id}`}
        variant="contained"
        color="primary"
        fullWidth
        style={{ marginTop: 8 }}
      >
        Go back to item
      </Button>
      <Typography variant="h4" gutterBottom>
        {toy.name} Feedback
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ marginBottom: 2 }}
        onClick={() => setShowReviewForm(!showReviewForm)}
      >
        Write a Review
      </Button>

      {showReviewForm && (
        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{ marginBottom: '1rem' }}
        >
          <TextField
            label="Your Name"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Your Review"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            margin="normal"
          />
          <Rating
            name="review-rating"
            precision={0.5}
            size="large"
            sx={{ marginBottom: '1rem' }}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ display: 'block', margin: 'auto' }}
          >
            Submit Review
          </Button>
        </Box>
      )}

      {toy.feedback.map((feedback) => (
        <Box key={feedback.id}>
          <Card variant="outlined" sx={{ mb: 2, mt: 2, position: 'relative' }}>
            <CardContent>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                {feedback.text}
              </Typography>
              <Rating
                value={Number(feedback.rating)}
                precision={0.5}
                readOnly
              />
              <Typography
                variant="body2"
                color="text.primary"
                sx={{ display: 'block', mt: 1 }}
              >
                By {feedback.author} on {feedback.date}
              </Typography>
            </CardContent>
            <Stack
              direction="row"
              spacing={1}
              sx={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                zIndex: 1,
              }}
            >
              <Button
                size="small"
                variant="contained"
                component={Link} // The Button will render as a Link component
                to={`/Toys/${parsedId}/Feedback/EditFeedback/${id}/${feedback.id}`} // Adjust the path here
              >
                Edit
              </Button>
              <Button
                size="small"
                variant="text"
                onClick={() => handleReportClick(feedback.id)}
              >
                Report
              </Button>
            </Stack>
          </Card>
          {reportedFeedbackId === feedback.id && (
            <>
              <Typography variant="body2" sx={{ color: 'red', mb: 2 }}>
                Reporting {feedback.author}&apos;s review.
              </Typography>
              {showReportForm === feedback.id && (
                <Box
                  component="form"
                  noValidate
                  autoComplete="off"
                  sx={{ marginBottom: '1rem' }}
                >
                  <TextField
                    label="Report Details"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    margin="normal"
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ display: 'block', margin: 'auto' }}
                  >
                    Submit Report
                  </Button>
                </Box>
              )}
            </>
          )}
        </Box>
      ))}
    </Container>
  );
}

export default FeedbackPage;
