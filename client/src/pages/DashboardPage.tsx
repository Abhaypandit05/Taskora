import React, { useState } from 'react';
import { Header } from '../components/dashboard/Header.js';
import { Sidebar } from '../components/dashboard/Sidebar.js';
import { StatsCards } from '../components/dashboard/StatsCards.js';
import { TaskList } from '../components/dashboard/TaskList.js';
import { UpcomingDeadlines } from '../components/dashboard/UpcomingDeadlines.js';
import { ActivityFeed } from '../components/dashboard/ActivityFeed.js';
import { TaskModal } from '../components/tasks/TaskModal.js';
import { DeleteConfirmModal } from '../components/tasks/DeleteConfirmModal.js';
import { Task, TaskStatus } from '../types/index.js';
import { useTasks } from '../context/TaskContext.js';

export const DashboardPage: React.FC = () => {
  const { deleteTask } = useTasks();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState<TaskStatus>('TODO');
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleOpenCreateModal = (status: TaskStatus = 'TODO') => {
    setModalStatus(status);
    setTaskToEdit(null);
    setIsTaskModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setTaskToEdit(task);
    setIsTaskModalOpen(true);
  };

  const handleDeletePrompt = (task: Task) => {
    setTaskToDelete(task);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!taskToDelete) return;

    setIsDeleting(true);

    try {
      await deleteTask(taskToDelete.id);
      setIsDeleteModalOpen(false);
      setTaskToDelete(null);
    } catch (err) {
      console.error('Delete task error:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#03090d] text-slate-100 selection:bg-[#00e6b8] selection:text-[#03090d]">
      {/* Ambient neon background */}
      <div className="pointer-events-none fixed -left-40 top-10 -z-10 h-[420px] w-[420px] rounded-full bg-[#00e6b8]/[0.07] blur-[150px]" />

      <div className="pointer-events-none fixed -right-40 top-[35%] -z-10 h-[500px] w-[500px] rounded-full bg-[#00cfa6]/[0.06] blur-[170px]" />

      <div className="pointer-events-none fixed bottom-0 left-[35%] -z-10 h-[350px] w-[350px] rounded-full bg-emerald-500/[0.04] blur-[140px]" />

      {/* Subtle background grid */}
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,230,184,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,230,184,0.5) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Header */}
      <Header
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      {/* Main layout */}
      <div className="mx-auto flex w-full max-w-[1600px] flex-1">
        {/* Sidebar */}
        <Sidebar
          isOpenMobile={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
        />

        {/* Dashboard content */}
        <main className="min-w-0 flex-1 space-y-6 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {/* Statistics */}
          <section className="animate-slide-up">
            <StatsCards />
          </section>

          {/* Main workspace */}
          <div className="grid grid-cols-1 items-start gap-6 pt-2 lg:grid-cols-3">
            {/* Task list */}
            <section className="min-w-0 space-y-6 lg:col-span-2">
              <TaskList
                onOpenCreateModal={() => handleOpenCreateModal('TODO')}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeletePrompt}
              />
            </section>

            {/* Right sidebar widgets */}
            <aside className="min-w-0 space-y-6">
              <UpcomingDeadlines />
              <ActivityFeed />
            </aside>
          </div>
        </main>
      </div>

      {/* Create / Edit Task Modal */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => {
          setIsTaskModalOpen(false);
          setTaskToEdit(null);
        }}
        defaultStatus={modalStatus}
        taskToEdit={taskToEdit}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setTaskToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        taskTitle={taskToDelete?.title || ''}
        isDeleting={isDeleting}
      />
    </div>
  );
};