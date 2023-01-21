import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Button, TextField, Box } from '@mui/material';
import { useAddNewProjectMutation } from './projectApi';
import { addProject } from './projectSlice';
import { useAppDispatch } from '@/app/hooks';

const AddProject = () => {
  const dispatch = useAppDispatch();
  const [apiAddProject] = useAddNewProjectMutation();
  const [hasFormError, setHasFormError] = useState(false);
  const [addInProgress, setAddInProgress] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');

  const handleKeyboardAdd = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      handleProjectSave();
    }
  };

  const handleSetProjectName = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setNewProjectName(e.target.value);
  };

  const handleProjectSave = () => {
    setHasFormError(false);

    if (!newProjectName) {
      setHasFormError(true);
      return;
    }

    const tmpId = uuid();
    dispatch(
      addProject({
        _id: tmpId,
        name: newProjectName,
      })
    );

    apiAddProject({ name: newProjectName })
      .unwrap()
      .then((createdProject) => {
        setAddInProgress(false);
      })
      .catch((error) => {
        console.log('Error saving new category', error);
      });
  };

  return (
    <>
      {addInProgress ? (
        <>
          <Box sx={{ pb: '16px' }}>
            <TextField
              value={newProjectName}
              placeholder='Project name'
              sx={{ width: '90%' }}
              autoFocus
              onChange={handleSetProjectName}
              onKeyUp={handleKeyboardAdd}
              error={hasFormError}
              helperText={hasFormError ? 'Project name is required' : ''}
            />
          </Box>
          <Button
            variant='outlined'
            sx={{ mr: '16px' }}
            onClick={() => setAddInProgress(false)}
          >
            Cancel
          </Button>
          <Button variant='contained' onClick={handleProjectSave}>
            Save
          </Button>
        </>
      ) : (
        <Button variant='outlined' onClick={() => setAddInProgress(true)}>
          Add new project
        </Button>
      )}
    </>
  );
};

export default AddProject;
