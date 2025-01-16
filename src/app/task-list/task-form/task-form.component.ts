import { Component, Output, EventEmitter, Inject, OnInit } from '@angular/core';
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
import { GenericService } from '../../services/generic.service';

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
export class TaskFormComponent implements OnInit {
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
    private genericService: GenericService,
    @Inject(MAT_DIALOG_DATA) public data: TaskModel
  ) {}

  ngOnInit(): void {
      if(this.data) {
        this.task = this.data
      }
  }

  saveTask(): void {
    if (!this.task.title.trim()) {
      this.genericService.showAlert('error', 'Task title is required.');
      return;
    }
  
    if (!this.task.description.trim()) {
      this.genericService.showAlert('error', 'Task description is required.');
      return;
    }
  
    if (!this.task.dueDate) {
      this.genericService.showAlert('error', 'Due date is required.');
      return;
    }
    this.task.id = this.task.id || uuidv4();
    this.taskService.saveTask(this.task);
    this.taskSaved.emit();

    this.genericService.showAlert('success', 'Task Created')
    this.resetForm();

    this.closeDialog(true);
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

  // a method for closing dialog, and also tells the parent if it should reload
  closeDialog(shouldRemount: boolean = false) {
    this.dialogRef.close(shouldRemount);
  }

  validateForm(task: TaskModel): boolean {
    let isValid = true;
    if(!task.title) {
      isValid = false;
    }
    if(!task.dueDate) {
      isValid = false;
    }
    if(!task.description) {
      isValid = false;
    }

    return isValid
  }
}
