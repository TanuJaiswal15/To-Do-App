import { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Stack,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [filter, setFilter] = useState("All");

  const addTask = () => {
    if (!newTask.trim()) return;
    const task = {
      id: Date.now(),
      text: newTask,
      priority,
      completed: false,
    };
    setTasks([...tasks, task]);
    setNewTask("");
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "Active") return !task.completed;
    if (filter === "Completed") return task.completed;
    return true;
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "linear-gradient(135deg, #1f1c2c, #928DAB)", // dark violet to soft grey gradient
        p: 2,
      }}
    >
      {/* Main Content */}
      <Container
        maxWidth="sm"
        sx={{
          mt: 6,
          p: 4,
          bgcolor: "rgba(18,18,18,0.9)", // translucent black
          borderRadius: 3,
          boxShadow: "0 8px 25px rgba(0,0,0,0.6)",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold", color: "#fff" }}>
          To-Do List
        </Typography>

        {/* Input Section */}
        <Stack direction="row" spacing={2} alignItems="center" mb={3}>
          <TextField
            label="New Task"
            variant="outlined"
            fullWidth
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            InputProps={{ style: { color: "white" } }}
          />
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel sx={{ color: "#aaa" }}>Priority</InputLabel>
            <Select
              value={priority}
              label="Priority"
              onChange={(e) => setPriority(e.target.value)}
              sx={{ color: "white" }}
            >
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" color="secondary" onClick={addTask}>
            ADD
          </Button>
        </Stack>

        {/* Filter Buttons */}
        <Stack direction="row" spacing={2} justifyContent="center" mb={2}>
          {["All", "Active", "Completed"].map((f) => (
            <Chip
              key={f}
              label={f}
              clickable
              color={filter === f ? "secondary" : "default"}
              onClick={() => setFilter(f)}
              sx={{ fontWeight: "bold" }}
            />
          ))}
        </Stack>

        <Divider sx={{ mb: 2, bgcolor: "rgba(255,255,255,0.2)" }} />

        {/* Task List */}
        {filteredTasks.length > 0 ? (
          <List>
            {filteredTasks.map((task) => (
              <ListItem
                key={task.id}
                secondaryAction={
                  <>
                    <IconButton onClick={() => toggleComplete(task.id)} color="success">
                      <CheckCircleIcon />
                    </IconButton>
                    <IconButton onClick={() => deleteTask(task.id)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </>
                }
              >
                <ListItemText
                  primary={task.text}
                  secondary={`Priority: ${task.priority}`}
                  sx={{
                    textDecoration: task.completed ? "line-through" : "none",
                    color: task.completed ? "gray" : "white",
                  }}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography align="center" sx={{ color: "lightgray", my: 2 }}>
            No tasks — add one above ✨
          </Typography>
        )}

        <Divider sx={{ mt: 2, mb: 2, bgcolor: "rgba(255,255,255,0.2)" }} />

        {/* Footer inside Card */}
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="body2" sx={{ color: "white" }}>
            {tasks.filter((t) => !t.completed).length} active • {tasks.length} total
          </Typography>
          <Button variant="outlined" color="secondary" onClick={clearCompleted}>
            CLEAR COMPLETED
          </Button>
        </Stack>
      </Container>

      {/* Sticky Footer */}
      <Typography
        variant="caption"
        align="center"
        sx={{ mt: 3, mb: 1, color: "white", opacity: 0.8 }}
      >
        copyright © Tanu Jaiswal (2201640100307)
      </Typography>
    </Box>
  );
}
