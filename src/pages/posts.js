import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
} from '@mui/material';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError('Error fetching posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const fetchComments = async (postId) => {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
      setComments(response.data);
    } catch (error) {
      console.error(`Error fetching comments for post ${postId}:`, error);
      setComments([]);
    }
  };

  const handleToggleComments = async (postId) => {
    if (selectedPostId === postId) {
      // If the same post is clicked again, hide the comments
      setSelectedPostId(null);
      setComments([]);
    } else {
      // Fetch and display comments for the selected post
      setSelectedPostId(postId);
      await fetchComments(postId);
      setDialogOpen(true);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <div>
      <Navbar />
      <h1>Posts Page</h1>
      {loading && <CircularProgress style={{ margin: '20px' }} />}
      {error && <Typography variant="h6" color="error">{error}</Typography>}
      {!loading && !error && (
        <Grid container spacing={2}>
          {posts.map((post) => (
            <Grid item key={post.id} xs={12} sm={6} md={4} lg={3}>
              <Card style={{ height: '100%' }}>
                <CardContent style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Avatar src={`https://i.pravatar.cc/40?u=${post.id}`} alt="Avatar" style={{ marginRight: '10px' }} />
                  <Typography variant="h6" component="div">
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {post.body}
                  </Typography>
                  <Button onClick={() => handleToggleComments(post.id)} variant="outlined">
                    Show Comments
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {isDialogOpen && (
        <Dialog open={isDialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="md">
          <DialogTitle>Comments</DialogTitle>
          <DialogContent>
            {comments.map((comment) => (
              <div key={comment.id}>
                <Typography variant="subtitle2">{comment.name}</Typography>
                <Typography variant="body1">{comment.body}</Typography>
                <hr style={{ margin: '10px 0' }} />
              </div>
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default Posts;
