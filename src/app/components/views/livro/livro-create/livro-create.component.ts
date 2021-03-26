import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-create',
  templateUrl: './livro-create.component.html',
  styleUrls: ['./livro-create.component.css']
})
export class LivroCreateComponent implements OnInit {

  id_cat: String = '';
  
  livro: Livro = {
    id: '',
    titulo: '',
    nome_autor: '',
    texto: ''
  }

  titulo = new FormControl('', [Validators.minLength(3)])
  nome_autor = new FormControl('', [Validators.minLength(3)])
  texto = new FormControl('', [Validators.minLength(20)])

  constructor(
    private service: LivroService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get('id_cat')!;
  }

  create(): void{
    this.service.create(this.livro, this.id_cat).subscribe(
      (resposta)=>{
        this.router.navigate([`categorias/${this.id_cat}/livros`]);
        this.service.mensagem('Livro Criado Com Sucesso');
      },
      err =>{
        this.router.navigate([`categorias/${this.id_cat}/livros`]);
        this.service.mensagem('Erro ao Criar Livro!, Tente Novamente.');
      }
    )
  }
  cancelar(): void{
    this.router.navigate([`categorias/${this.id_cat}/livros`]);
  }
  getMessage(){
    if(this.titulo.invalid){
      return 'O Campo título deve conter entre 3 e 100 caracteres!';
    }
    if(this.nome_autor.invalid){
      return 'O Campo Nome do Autor deve conter entre 3 e 100 caracteres!';
    }
    if(this.texto.invalid){
      return 'O Campo Texto deve conter entre 20 e 2000000 caracteres!';
    }
    return false;
  }
}
