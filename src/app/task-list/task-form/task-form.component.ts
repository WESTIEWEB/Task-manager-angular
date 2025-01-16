import { Component, Output, EventEmitter, Inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { TaskService } from '../../services/task.service';
import { TaskModel } from '../../models/task.model';
import { v4 as uuidv4 } from 'uuid';
import { MatListModule } from '@angular/material/list';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatListModule,
    MatIconModule
  ],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  tasks: TaskModel[] = [];
  filteredTasks: TaskModel[] = [];
  priorityFilter = '';
  statusFilter = '';
  task: TaskModel = {
    id: '',
    title: '',
    description: '',
    dueDate: '',
    priority: 'Low',
    status: 'Pending',
  };

  @Output() taskSaved = new EventEmitter<void>();

  constructor(
    private taskService: TaskService,
    public dialogRef: MatDialogRef<TaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskModel
  ) {}

  saveTask(): void {
    this.task.id = this.task.id || uuidv4();
    this.taskService.saveTask(this.task);
    this.taskSaved.emit();
    this.resetForm();
  }

  resetForm(): void {
    this.task = {
      id: '',
      title: '',
      description: '',
      dueDate: '',
      priority: 'Low',
      status: 'Pending',
    };
  }

  loadTasks(): void {
    this.tasks = this.taskService.getTasks();
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredTasks = this.tasks.filter(
      (task) =>
        (!this.priorityFilter || task.priority === this.priorityFilter) &&
        (!this.statusFilter || task.status === this.statusFilter)
    );
  }

  deleteTask(taskId: string): void {
    this.taskService.deleteTask(taskId);
    this.loadTasks();
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
