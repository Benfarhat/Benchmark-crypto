# SHA256 Dictionary Generator

The principle of this code is to generate a hash dictionary to a MongoDB database.

The purpose of this project is to show the vulnerability of these algorithms when they do not use dynamic salt.


The moral of this story is that for highly sensitive systems (social security number, bank account number, password) it is better to strengthen the methods of hashages, by the use of a dynamic salt, a greater number of alphabets, the concatenation of several sensitive infos, the addition of characters from other encodings or the recursive use of several types of algorithms (requires a great deal of computing power)

After configuring the code simply do:

```
yarn start
```

For memory management issues please run this application like this:

```
node --max-old-space-size=8192 index.js
```

---

Le principe de ce code est de générer un dictionnaire de hash vers une base de donnée MongoDB.
La finalité de ce projet est de montrer la vulnérabilité des ces algorithmes lorsqu'ils n'utilisent pas de sel dynamique.

numéro de sécurité sociale
La morale de cette histoire est que pour des systèmes hautement sensibles (numéro de sécurité sociale, numéro de compte bancaire, mot de passe)  il est préférable de renforcer les méthodes de hashages, par l'usage d'un sel dynamique, un plus grand nombre d'alphabets, la concaténation de plusieurs infos sensibles, l'ajout de charactères provenant d'autres encodage ou encore l'utilisation récursive de plusieurs types d'algorithmes (demande une grande puissance de calcul)

Après avoir configuré le code faites tout simplement:

```
yarn start
```

Pour les problèmes liés à la gestion de la mémoire veuillez exécuter cette application comme ceci:

```
node --max-old-space-size=8192 index.js
```