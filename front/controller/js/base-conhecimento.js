const base =
{
    pergunta: 'Você está pensando em um ser Vivo?',
    sim: {
        pergunta: 'Ele é Doméstico?',
        sim: {
            pergunta: 'É Mamífero?',
            sim: {
                pergunta: 'Costuma estar em casas?',
                sim: {
                    pergunta: 'É um Roedor?',
                    sim: {
                        resultado: 'Hamster'
                    },
                    nao: {
                        pergunta: 'É um Felino?',
                        sim: {
                            resultado: 'Gato'
                        },
                        nao: {
                            resultado: 'Cachorro'
                        }
                    }
                },
                nao: {
                    pergunta: 'Esse animal produz leite?',
                    sim: {
                        resultado: 'Vaca'
                    },
                    nao: {
                        pergunta: 'Ele costuma ser conhecido por rolar na lama?',
                        sim: {
                            resultado: 'Porco'
                        },
                        nao: {
                            resultado: 'Cavalo'
                        }
                    }
                }
            },
            nao: {
                pergunta: 'Esse animal costuma ser tagarela?',
                sim: {
                    resultado: 'Papagaio'
                },
                nao: {
                    resultado: 'Galinha'
                }
            }
        },
        nao: {
            pergunta: 'É Mamifero?',
            sim: {
                pergunta: 'Ele é aquático?',
                sim: {
                    pergunta: 'Pode ser gigante?',
                    sim: {
                        resultado: 'Baleia'
                    },
                    nao: {
                        resultado: 'Golfinho'
                    }
                },
                nao: {
                    pergunta: 'Ele é proveniente da savana?',
                    sim: {
                        pergunta: 'Pode ter mais de 2m?',
                        sim: {
                            pergunta: 'Esse animal é conhecido por ter o pescoço é longo?',
                            sim: {
                                resultado: 'Girafa'
                            },
                            nao: {
                                resultado: 'Elefante'
                            }
                        },
                        nao: {
                            pergunta: 'Ele é um Felino?',
                            sim: {
                                resultado: 'Leão'
                            },
                            nao: {
                                resultado: 'Hipopótamo'
                            }
                        }
                    },
                    nao: {
                        pergunta: 'Ele é um caçador?',
                        sim: {
                            pergunta: 'É felino?',
                            sim: {
                                resultado: 'Onça pintada'
                            },
                            nao: {
                                pergunta: 'Tem o costume de andar em matilha?',
                                sim: {
                                    resultado: 'Lobo'
                                },
                                nao: {
                                    resultado: 'Urso'
                                }
                            }
                        },
                        nao: {
                            pergunta: 'Esse animal voa?',
                            sim: {
                                resultado: 'Morcego'
                            },
                            nao: {
                                resultado: 'Chipanzé'
                            }
                        }
                    }
                }
            },
            nao: {
                pergunta: 'Esse animal é uma ave?',
                sim: {
                    pergunta: 'Costuma viver no frio da antártida?',
                    sim: {
                        resultado: 'Pinguim'
                    },
                    nao: {
                        pergunta: 'É conhecido por ter hábitos noturnos?',
                        sim: {
                            resultado: 'Coruja'
                        },
                        nao: {
                            resultado: 'Águia'
                        }
                    }
                },
                nao: {
                    pergunta: 'É um réptil?',
                    sim: {
                        pergunta: 'Ele rasteja?',
                        sim: {
                            resultado: 'Cobra'
                        },
                        nao: {
                            resultado: 'Jacaré'
                        }
                    },
                    nao: {
                        pergunta: 'É Anfíbio?',
                        sim: {
                            resultado: 'Sapo'
                        },
                        nao: {
                            pergunta: 'É um tipo de Peixe?',
                            sim: {
                                pergunta: 'Costuma ser encontrado em águas salgadas?',
                                sim: {
                                    resultado: 'Tubarão'
                                },
                                nao: {
                                    resultado: 'Bagre'
                                }
                            },
                            nao: {
                                pergunta: 'Esse inseto tem 6 patas?',
                                sim: {
                                    pergunta: 'É pintado?',
                                    sim: {
                                        resultado: 'Joaninha'
                                    },
                                    nao: {
                                        resultado: 'Formiga'
                                    }
                                },
                                nao: {
                                    resultado: 'Aranha'
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    nao: {
        pergunta: 'Esse objeto é Escolar?',
        sim: {
            pergunta: 'Usado para escrever?',
                sim: {
                    pergunta: 'Possui tinta?',
                    sim: {
                        resultado: 'Caneta'
                    },
                    nao: {
                        resultado: 'Lápis'
                    }
                },
                nao: {
                    pergunta: 'Usado para armazenar itens?',
                    sim: {
                        pergunta: 'É comum usar nas costas?',
                        sim: {
                            resultado: 'Mochila'
                        },
                        nao: {
                            resultado: 'Estojo'
                        }
                    },
                    nao: {
                        pergunta: 'Esse objeto é usado para apontar lápis?',
                        sim: {
                            resultado: 'Apontador'
                        },
                        nao: {
                            resultado: 'Tesoura'
                        }
                    }
                }
        },
        nao: {
            pergunta: 'É de Cozinha?',
            sim: {
                pergunta: 'É um talher?',
                sim: {
                    pergunta: 'Usado para comer sopa?',
                    sim: {
                        resultado: 'Colher'
                    },
                    nao: {
                        pergunta: 'Costuma ser usado para cortar?',
                        sim: {
                            resultado: 'Faca'
                        },
                        nao: {
                            resultado: 'Garfo'
                        }
                    }
                },
                nao: {
                    pergunta: 'Costuma ser levado ao fogão?',
                    sim: {
                        pergunta: 'Costuma ser usado para fazer panquecas?',
                        sim: {
                            resultado: 'Frigideira'
                        },
                        nao: {
                            resultado: 'Panela'
                        }
                    },
                    nao: {
                        resultado: 'Prato'
                    }
                }
            },
            nao: {
                pergunta: 'Costuma ser encontrado em um quarto?',
                sim: {
                    pergunta: 'Podem ser guardados?',
                    sim: {
                        pergunta: 'Costuma ser coberto por uma fronha?',
                        sim: {
                            resultado: 'Travesseiro'
                        },
                        nao: {
                            resultado: 'Cobertor'
                        }
                    },
                    nao: {
                        pergunta: 'É de costume gardamos coisas leve?',
                        sim: {
                            resultado: 'Guarda-roupas'
                        },
                        nao: {
                            resultado: 'Cama'
                        }
                    }
                },
                nao: {
                    pergunta: 'É um objeto Eletrônico?',
                    sim: {
                        pergunta: 'Pode ser manuseado por um controle remoto?',
                        sim: {
                            pergunta: 'É usado para mídia?',
                            sim: {
                                pergunta: 'Possui interação visual?',
                                sim: {
                                    resultado: 'Televisão'
                                },
                                nao: {
                                    resultado: 'Rádio'
                                }
                            },
                            nao: {
                                pergunta: 'Pode ser assemelhado a um humano?',
                                sim: {
                                    resultado: 'Robô'
                                },
                                nao: {
                                    resultado: 'Drone'
                                }
                            }
                        },
                        nao: {
                            pergunta: 'Pode ser usado como meio de comunicação entre pessoas?',
                            sim: {
                                pergunta: 'Cabe na palma da mão?',
                                sim: {
                                    resultado: 'Celular'
                                },
                                nao: {
                                    resultado: 'Computador'
                                }
                            },
                            nao: {
                                pergunta: 'Costuma ser usado para traçar rotas?',
                                sim: {
                                    resultado: 'GPS'
                                },
                                nao: {
                                    resultado: 'Impressora'
                                }
                            }
                        }
                    },
                    nao: {
                        pergunta: 'É uma ferramenta?',
                        sim: {
                            pergunta: 'É elétrico?',
                            sim: {
                                pergunta: 'Costuma ser usado para cortar?',
                                sim: {
                                    resultado: 'Maquita'
                                },
                                nao: {
                                    pergunta: 'Costuma ser usado para lixar?',
                                    sim: {
                                        resultado: 'Lixadeira'
                                    },
                                    nao: {
                                        resultado: 'Furadeira'
                                    }
                                }
                            },
                            nao: {
                                pergunta: 'Costuma ser usado para apertar parafusos?',
                                sim: {
                                    resultado: 'Chave de fenda'
                                },
                                nao: {
                                    resultado: 'Martelo'
                                }
                            }
                        },
                        nao: {
                            resultado: 'Lingote de Ouro'
                        }
                    }
                }
            }
        }
    }
};

localStorage.setItem('base-conhecimento', JSON.stringify(base));